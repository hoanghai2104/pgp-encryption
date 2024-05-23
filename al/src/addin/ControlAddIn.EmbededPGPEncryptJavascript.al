controladdin EmbededPGPEncryptionJavascript
{
    VerticalStretch = true;
    VerticalShrink = false;

    HorizontalStretch = true;
    HorizontalShrink = false;

    RequestedHeight = 700;

    Scripts =
        // 'https://cdn.jsdelivr.net/npm/openpgp@5.11.1/dist/openpgp.min.js',
        'scripts\lib\openpgp.min.js',
        'scripts\lib\jquery-3.7.0.min.js',
        'scripts\main.js';

    StartupScript = 'scripts\startup.js';

    event GetEmbedInformation();
}