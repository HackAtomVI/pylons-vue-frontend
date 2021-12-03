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

export function getItems() {
  return this.$store.dispatch('Pylonstech.pylons.pylons/QueryListItemByOwner', {
    params: {
      '@type': 'Pylonstech.pylons.pylons/QueryListItemByOwner',
      owner: this.$store.getters['common/wallet/address'],
    },
  })
}

export function craftWeapon() {
  return this.$store.dispatch('Pylonstech.pylons.pylons/sendMsgExecuteRecipe', {
    value: {
      '@type': '/Pylonstech.pylons.pylons.MsgExecuteRecipe',
      creator: this.$store.getters['common/wallet/address'],
      cookbookID: 'nftarena',
      recipeID: 'mintweapon',
      coinInputsIndex: '0',
      itemIDs: [],
      paymentInfos: [],
    },
  })
}

export function craftArmor() {
  return this.$store.dispatch('Pylonstech.pylons.pylons/sendMsgExecuteRecipe', {
    value: {
      '@type': '/Pylonstech.pylons.pylons.MsgExecuteRecipe',
      creator: this.$store.getters['common/wallet/address'],
      cookbookID: 'nftarena',
      recipeID: 'mintarmor',
      coinInputsIndex: '0',
      itemIDs: [],
      paymentInfos: [],
    },
  })
}

export function craftShield() {
  return this.$store.dispatch('Pylonstech.pylons.pylons/sendMsgExecuteRecipe', {
    value: {
      '@type': '/Pylonstech.pylons.pylons.MsgExecuteRecipe',
      creator: this.$store.getters['common/wallet/address'],
      cookbookID: 'nftarena',
      recipeID: 'mintshield',
      coinInputsIndex: '0',
      itemIDs: [],
      paymentInfos: [],
    },
  })
}
