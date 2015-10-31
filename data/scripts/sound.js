const audio = new Audio('../notification.wav');

self.port.on('playSound', audio.play);
