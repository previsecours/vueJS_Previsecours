<template>
    <div class="btn-group">
        <li class="dropdown-toggle">
          <font-awesome-icon :icon="this.iconName" />
        </li>
    </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
export default {
    components:{
      FontAwesomeIcon
    },
    props: {
        iconName: String
    },
}
</script>

<style scoped>

    .btn-group {
        width: 40px;
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
      text-align: center;
        color: #636b6f;
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
        &:hover {
          background: #e1e1e1;
          cursor: pointer;
        }
    }
</style>
