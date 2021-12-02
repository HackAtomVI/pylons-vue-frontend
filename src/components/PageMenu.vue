<template>
  <div class="nav-wrapper">
    <nav class="nav">
      <div class="nav__content">
        <ul :class="showMenuClass">
          <li>
            <router-link to="/"> HOME </router-link>
          </li>
          <li>
            <router-link to="/workshop"> WORKSHOP </router-link>
          </li>
          <li>
            <router-link to="/arena"> ARENA </router-link>
          </li>
          <li>
            <router-link to="/upload"> UPLOAD </router-link>
          </li>
          <li>
            <router-link to="/about"> CROWD CONTROL </router-link>
          </li>
          <li>
            <a class="discord-button" href="https://discord.gg/ZKKbhUs">
              <picture style="color: black">
                <source type="image/webp" srcset="../assets/icon/discord.webp" />
                <source type="image/png" srcset="../assets/icon/discord.png" />
                <img
                  src="../assets/icon/discord.png"
                  style="display: inline; max-height: 20px; transform: translateY(4px); filter: invert(1)"
                  alt="Image description"
                />
                JOIN US
              </picture>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'PageMenu',
  data() {
    return {
      displayMenu: false,
      displayLoginDialogue: false,
    }
  },
  computed: {
    showMenuClass() {
      if (this.displayMenu) {
        return 'nav__menu '
      } else {
        return 'nav__menu nav__menu--hidden'
      }
    },
  },
  methods: {
    doNothing() {},
  },
}
</script>

<style scoped lang="scss">
@import '../scss/variables';
* {
  font-family: $font-family;
}
.nav-wrapper {
  width: 100%;
}

.nav {
  width: 100%;
  font-weight: bold;
  display: flex;
  justify-content: center;
  background-color: $dark-gray;
  position: relative;
}

.nav__content {
  width: 100%;
  position: relative;
  display: flex;
  flex-flow: row;
  justify-content: center;
}

.nav__menu {
  width: auto;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.nav__menu li {
  float: left;

  a,
  .nav__menu__item {
    font-family: $font-family-header;
    padding: 1.5rem;
    font-size: $font-size * 1.15;
    color: white;
    text-align: center;

    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    position: relative;
    -webkit-transition-property: color;
    transition-property: color;
    -webkit-transition-duration: $animation-duration;
    transition-duration: $animation-duration;
    &:before {
      content: '';
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: $white;
      -webkit-transform: scaleX(0);
      transform: scaleX(0);
      -webkit-transform-origin: 0 50%;
      transform-origin: 0 50%;
      -webkit-transition-property: transform;
      transition-property: transform;
      -webkit-transition-duration: $animation-duration;
      transition-duration: $animation-duration;
      -webkit-transition-timing-function: ease-out;
      transition-timing-function: ease-out;
    }
    &:hover,
    &:focus,
    &:active {
      color: $minor-color-c;
    }
    &:hover:before,
    &:focus:before,
    &:active:before {
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
  }
  &.nav__menu__item--exposed {
    transform: skewX(-15deg);
    background-color: $white;
    a {
      color: $black;
    }
  }
}

.nav__authentication-modal {
  position: absolute;
  width: 60vw;
  right: 5.5rem;
  margin-top: -2.5rem;
  z-index: 10000000;
  box-shadow: $border-thickness-bold * 1.5 $border-thickness-bold * 1.5 rgba(0, 0, 0, 0.3);
}

.nav__logo {
  position: relative;
  display: inline-block;
  margin: -1em 1em -2em 0em;
  -webkit-user-drag: none;
  width: 350px;
  height: 100%;
}

.nav__button {
  color: $black;
  position: absolute;
  right: 1.5em;
  top: 8vw;
}

.nav__menu--hidden {
}
.discord-button {
  background-color: white;
  color: black;
  padding: 0;
  font-size: $font-size;
}
</style>
