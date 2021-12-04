export function getNft() {
  console.log('What the actual fuck')
  return this.$store
    .dispatch('Pylonstech.pylons.pylons/QueryListItemByOwner', {
      params: {
        '@type': 'Pylonstech.pylons.pylons/QueryListItemByOwner',
        owner: this.$store.getters['common/wallet/address'],
      },
    })
    .then((res) => {
      console.log('getNft res:', res)
      let found = false
      res.Items.forEach((item) => {
        if (!found) {
          item.strings.forEach((str) => {
            if (!found && str.Key === 'ItemType' && str.Value === 'nft') {
              let entry = {
                ID: item.ID,
              }
              item.strings.forEach((string) => {
                entry[string.Key] = string.Value
              })
              item.doubles.forEach((double) => {
                entry[double.Key] = double.Value
              })
              item.mutableStrings.forEach((string) => {
                entry[string.Key] = string.Value
              })
              console.log('Entry:', entry)
              found = entry
            }
          })
        }
      })
      return found
    })
}
export function isLoggedIn() {
  return this.$store.getters['common/wallet/loggedIn']
}
export function getItems() {
  return this.$store
    .dispatch('Pylonstech.pylons.pylons/QueryListItemByOwner', {
      params: {
        '@type': 'Pylonstech.pylons.pylons/QueryListItemByOwner',
        owner: this.$store.getters['common/wallet/address'],
      },
    })
    .then((res) => {
      console.log('items', res)
      let items = []
      res.Items.forEach((item) => {
        let entry = {
          ID: item.ID,
        }
        item.strings.forEach((string) => {
          entry[string.Key] = string.Value
        })
        item.doubles.forEach((double) => {
          entry[double.Key] = double.Value
        })
        items.push(entry)
      })
      return items
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
