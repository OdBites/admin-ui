# Known Issues

## Bugs Or Likely Bugs

1. Product edit image validation can fail when existing image strings are used
   where the schema expects `File` instances.
2. Payment refund display can throw if refund exists without `refundAmount`.

## Incomplete Areas

- Dashboard quick action buttons do not navigate or mutate data.
- Support page is a placeholder.

## Repo Split Notes

- Keep `VITE_MF_REMOTE_URL` documented because this repo cannot run alone without
  the MF remote.
