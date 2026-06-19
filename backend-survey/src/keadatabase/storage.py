from whitenoise.storage import CompressedManifestStaticFilesStorage


class NonStrictCompressedManifestStaticFilesStorage(
    CompressedManifestStaticFilesStorage
):
    """Whitenoise's manifest static files storage with ``manifest_strict`` disabled."""

    manifest_strict = False
