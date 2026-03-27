$(document).ready(function() {
    let qrCodeInstance = null;

    // Toggle Wi-Fi fields
    $('#contentType').on('change', function() {
        if ($(this).val() === 'wifi') {
            $('#contentInput').addClass('d-none');
            $('#wifiFields').removeClass('d-none');
        } else {
            $('#contentInput').removeClass('d-none');
            $('#wifiFields').addClass('d-none');
        }
    });

    $('#generateBtn').on('click', function() {
        generateQR();
    });

    function generateQR() {
        const type = $('#contentType').val();
        let content = '';

        if (type === 'wifi') {
            const ssid = $('#wifiSSID').val().trim();
            const pass = $('#wifiPassword').val().trim();
            const enc = $('#wifiEncryption').val();
            content = `WIFI:S:${ssid};T:${enc};P:${pass};;`;
        } else {
            content = $('#qrContent').val().trim() || 'https://example.com';
        }

        const fg = $('#fgColor').val();
        const bg = $('#bgColor').val();
        const level = $('#errorLevel').val();

        // Clear previous
        $('#qrcode').empty();

        // Generate new QR using qrcode.js
        qrCodeInstance = new QRCode(document.getElementById("qrcode"), {
            text: content,
            width: 300,
            height: 300,
            colorDark: fg,
            colorLight: bg,
            correctLevel: QRCode.CorrectLevel[level]
        });

        // Simple logo overlay (basic version - for advanced, use canvas manipulation)
        setTimeout(() => {
            const logoUrl = $('#logoUrl').val().trim();
            if (logoUrl) {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.src = logoUrl;
                img.onload = function() {
                    const canvas = $('#qrcode canvas')[0];
                    if (canvas) {
                        const ctx = canvas.getContext('2d');
                        const size = 60;
                        const x = (canvas.width - size) / 2;
                        const y = (canvas.height - size) / 2;
                        ctx.drawImage(img, x, y, size, size);
                    }
                };
            }
        }, 100);
    }

    // Download PNG
    $('#downloadPNG').on('click', function() {
        const canvas = $('#qrcode canvas')[0];
        if (canvas) {
            const link = document.createElement('a');
            link.download = 'qr-code.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    });

    // Basic SVG download (placeholder - can be enhanced)
    $('#downloadSVG').on('click', function() {
        alert('SVG download coming soon! For now, right-click the QR and save as image.');
    });

    // Auto-generate on load
    setTimeout(() => {
        generateQR();
    }, 800);
});
