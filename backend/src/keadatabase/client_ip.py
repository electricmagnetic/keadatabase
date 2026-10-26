"""Client IP helpers (no Django imports, so they are safe to use in settings).

``X-Forwarded-For`` and ``REMOTE_ADDR`` hold the address of the nearest proxy
(DigitalOcean's ingress), so they must not be used to identify visitors.
Behind Cloudflare the visitor's address is in ``CF-Connecting-IP``; otherwise
DigitalOcean App Platform provides it in ``do-connecting-ip``.
"""

CLIENT_IP_META_KEYS = ('HTTP_CF_CONNECTING_IP', 'HTTP_DO_CONNECTING_IP', 'REMOTE_ADDR')


def get_client_ip(request):
    """Return the visitor's IP address, or ``None`` if it can't be determined."""
    for key in CLIENT_IP_META_KEYS:
        ip = request.META.get(key)
        if ip:
            return ip.strip()
    return None


def posthog_request_properties(request):
    """Override PostHog's ``$ip`` with the real client IP.

    Used as ``POSTHOG_MW_EXTRA_PROPERTIES``. PostHog's middleware reads
    ``X-Forwarded-For`` by default, which is a proxy address here.
    """
    ip = get_client_ip(request)
    return {'$ip': ip} if ip else {}
