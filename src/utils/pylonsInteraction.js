export function getNft() {
  return this.$store
    .dispatch('Pylonstech.pylons.pylons/QueryListItemByOwner', {
      params: {
        '@type': 'Pylonstech.pylons.pylons/QueryListItemByOwner',
        owner: this.$store.getters['common/wallet/address'],
      },
    })
    .then((res) => {
      let found = false
      res.Items.forEach((item) => {
        if (!found) {
          item.strings.forEach((str) => {
            if (!found && str.Key === 'ItemType' && str.Value === 'nft') {
              found = item
            }
          })
        }
      })
      return found
    })
}
