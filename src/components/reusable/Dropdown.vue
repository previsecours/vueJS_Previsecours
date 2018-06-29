<template>
<div class="btn-group">
  <li @click="toggleMenu()" class="dropdown-toggle" v-if="selectedOption.name !== undefined">
    <font-awesome-icon :icon="this.iconName" /> {{ selectedOption.name }}
    <span class="caret"></span>
  </li>

  <li @click="toggleMenu()" class="dropdown-toggle" v-if="selectedOption.name === undefined">
    <font-awesome-icon :icon="this.iconName" /> {{placeholderText}}
    <span class="caret"></span>
  </li>

  <ul class="dropdown-menu closeDropdownIfOpen" v-if="showMenu">
    <li v-for="option in options">
      <a @click="updateOption(option)">
                    {{ option.name }}
                </a>
    </li>
  </ul>
</div>
</template>

<script>
import {
  bus_filters
} from '../../store/bus_filters.js'
export default {
  data () {
    return {
      selectedOption: {
        name: ''
      },
      showMenu: false,
      placeholderText: 'Please select an item'
    }
  },
  props: {
    options: {
      type: [Array, Object]
    },
    selected: {},
    placeholder: [String],
    iconName: String
  },
  mounted () {
    this.selectedOption = this.selected
    if (this.placeholder) {
      this.placeholderText = this.placeholder
    }
    bus_filters.$on('i-got-clicked', () => {
      this.showMenu = false
    })
  },
  methods: {
    updateOption (option) {
      this.selectedOption = option
      this.showMenu = false
      this.$emit('updateOption', this.selectedOption)
    },
    toggleMenu () {
      if (this.showMenu === false) bus_filters.$emit('i-got-clicked', 'if you listen to this, please close yourself')
      this.showMenu = !this.showMenu
    }
  }
  // computed:{
  //   icon(){
  //     return this.'map-signs'
  //   }
  // }
}
</script>

<style scoped>
.btn-group {
  min-width: 160px;
  height: 40px;
  position: relative;
  margin: 0px 0px;
  display: inline-block;
  vertical-align: middle;
  background-color: #f6f6f6;
  a {
    &:hover {
      text-decoration: none;
    }
  }
}

.dropdown-toggle {
  color: #636b6f;
  min-width: 160px;
  padding: 10px;
  text-transform: none;
  font-weight: 300;
  margin-bottom: 7px;
  border: 0;
  background-image: linear-gradient(#009688, #009688), linear-gradient(#D2D2D2, #D2D2D2);
  background-size: 0 2px, 100% 1px;
  background-repeat: no-repeat;
  background-position: center bottom, center calc(100% - 1px);
  background-color: transparent;
  transition: background 0s ease-out;
  float: none;
  box-shadow: none;
  border-radius: 0;
  list-style: none;
}

.dropdown-toggle:hover {
  background: #e1e1e1;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  bottom: 100%;
  right: 0;
  z-index: 1000;
  float: left;
  min-width: 160px;
  padding: 0px 0;
  margin: 2px 0 0;
  list-style: none;
  font-size: 14px;
  text-align: left;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-clip: padding-box;

}

.dropdown-menu>li>a {
  padding: 10px 30px;
  display: block;
  clear: both;
  font-weight: normal;
  line-height: 1.6;
  color: #636b6f;
  white-space: nowrap;
  text-decoration: none;
}

.dropdown-menu>li>a:hover {
  background: #efefef !important;
  color: #409FCB;
}

.dropdown-menu>li {
  overflow: hidden;
  width: 100%;
  position: relative;
  margin: 0;
}

.caret {
  display: relative;
  width: 0;
  position: relative;
  top: 10px;
  height: 0;
  margin-left: 2px;
  vertical-align: middle;
  /* border-top: 4px dashed;
      border-top: 4px solid \9; */
  border-bottom: 4px solid #636b6f;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  float: right;
}
</style>
