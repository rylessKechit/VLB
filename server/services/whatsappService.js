// server/services/whatsappService.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');

class WhatsAppService {
  constructor() {
    this.client = null;
    this.isReady = false;
    this.sessionDataPath = path.join(__dirname, '../.wwebjs_auth');
    this.qrFilePath = path.join(__dirname, '../public/whatsapp-qr.txt');
    this.connectionStatus = 'disconnected';
    this.init();
  }

  init() {
    // Créer le dossier de session s'il n'existe pas
    if (!fs.existsSync(this.sessionDataPath)) {
      fs.mkdirSync(this.sessionDataPath, { recursive: true });
    }

    // Initialiser le client WhatsApp
    this.client = new Client({
      authStrategy: new LocalAuth({ clientId: 'taxi-vlb-server' }),
      puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    });

    // Gérer l'événement QR code
    this.client.on('qr', (qr) => {
      this.connectionStatus = 'qr-received';
      console.log('QR Code reçu. Scannez-le avec WhatsApp sur votre téléphone.');
      
      // Générer QR code dans le terminal
      qrcode.generate(qr, { small: true });
      
      // Enregistrer le QR code dans un fichier pour l'interface admin
      fs.writeFileSync(this.qrFilePath, qr);
    });

    // Gérer l'initialisation du client
    this.client.on('ready', () => {
      this.isReady = true;
      this.connectionStatus = 'connected';
      console.log('Client WhatsApp prêt!');
    });

    // Gérer les erreurs d'authentification
    this.client.on('auth_failure', (error) => {
      this.connectionStatus = 'auth-failed';
      console.error('Échec d\'authentification WhatsApp:', error);
    });

    // Gérer la déconnexion
    this.client.on('disconnected', (reason) => {
      this.isReady = false;
      this.connectionStatus = 'disconnected';
      console.log('Client WhatsApp déconnecté:', reason);
      
      // Réinitialiser la session et reconnecter après un délai
      setTimeout(() => {
        console.log('Tentative de reconnexion WhatsApp...');
        this.client.initialize();
      }, 10000);
    });

    // Initialiser le client
    try {
      this.client.initialize();
    } catch (error) {
      console.error('Erreur lors de l\'initialisation du client WhatsApp:', error);
    }
  }

  async sendMessage(phoneNumber, message) {
    if (!this.isReady) {
      console.warn('Client WhatsApp non prêt. Message non envoyé.');
      return { success: false, error: 'Client not ready' };
    }

    try {
      // Formater le numéro de téléphone (ajouter @c.us)
      const formattedNumber = phoneNumber.includes('@c.us') 
        ? phoneNumber 
        : `${phoneNumber.replace(/[^0-9]/g, '')}@c.us`;

      // Vérifier si le numéro existe sur WhatsApp
      const isRegistered = await this.client.isRegisteredUser(formattedNumber);
      if (!isRegistered) {
        console.warn(`Le numéro ${phoneNumber} n'est pas enregistré sur WhatsApp.`);
        return { success: false, error: 'Number not registered on WhatsApp' };
      }

      // Envoyer le message
      const result = await this.client.sendMessage(formattedNumber, message);
      console.log(`Message envoyé à ${phoneNumber}`);
      return { success: true, messageId: result.id._serialized };
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message WhatsApp:', error);
      return { success: false, error: error.message };
    }
  }

  getStatus() {
    return {
      isReady: this.isReady,
      status: this.connectionStatus
    };
  }

  // Méthode pour redémarrer le client (utile pour l'interface admin)
  async restart() {
    try {
      if (this.client) {
        await this.client.destroy();
      }
      this.init();
      return { success: true };
    } catch (error) {
      console.error('Erreur lors du redémarrage du client WhatsApp:', error);
      return { success: false, error: error.message };
    }
  }
}

// Créer une instance singleton
//const whatsappService = new WhatsAppService();

module.exports = whatsappService;