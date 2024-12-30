export const BUILDER = {
  importFilePath: {
    message: 'Çevirilerin import edileceği json dosyasının yolu',
    default: './translations.json'
  },
  newLocaleKey: {
    message: 'Çeviri dosyasındaki hangi locale key import edilecek?',
    required: true
  },
  fallbackLocaleKey: {
    message:
      'Çeviri dosyasındaki hangi locale key fallback olarak kullanılacak?',
    required: false
  }
}
