<template>
  <div>
    <div :class="applyBackground">
      <CHeading text-align="start" mb="4">
        <CGrid :w="width" template-columns="repeat(6, 1fr)" gap="6">
          <CBox class="box" w="100%" h="10" bg="#FBB6CE" display="flex" align-items="center" justify-content="center">🎞️</CBox>
          <CBox w="100%" h="10" bg="#F687B3" display="flex" align-items="center" justify-content="center">F</CBox>
          <CBox w="100%" h="10" bg="#ED64A6" display="flex" align-items="center" justify-content="center">I</CBox>
          <CBox w="100%" h="10" bg="#D53F8C" display="flex" align-items="center" justify-content="center">L</CBox>
          <CBox w="100%" h="10" bg="#B83280" display="flex" align-items="center" justify-content="center">M</CBox>
          <CBox w="100%" h="10" bg="#97266D" display="flex" align-items="center" justify-content="center">S</CBox>
        </CGrid>
      </CHeading>

      <CInput placeholder="Names" v-model="Names" />

      <br>

      <CGrid w="100%"
              :template-columns="grid"
              gap="6">
        <CBox v-for="(Name, index) in Names.split(' ').filter(r => r !== '')"
               :key="index">
          <Participant :name="Name"
                       :index="index">
          </Participant>
        </CBox>
      </CGrid>

      <br>

      <CButton v-on:click="calculate()">Next Round</CButton>

      <canvas class="mycanvas"
              v-show="this.$store.state.Users.finished"
              id="my-canvas" >
      </canvas>
    </div>
  </div>
</template>

<script lang="js">
import ConfettiGenerator from "confetti-js";
import Participant from '@/components/Participant.vue'
import winSound from '../assets/win.mp3'
import {
  CBox,
  CButton,
  CHeading,
  CInput,
  CGrid,
} from '@chakra-ui/vue'

export default {
  name: 'IndexPage',
  components: {
    CBox,
    CButton,
    CHeading,
    CInput,
    CGrid,
    Participant
  },
  inject: ['$chakraColorMode', '$toggleColorMode'],

  data () {
    return {
      mobile: false,
      Names:'',
      message:'',
      audio: null
    }
  },
  created() {
    this.$store.commit('Users/clearStore')
  },
  watch: {
    '$store.state.Users.finished': function() {
      if (this.$store.state.Users.finished) {
        let confettiSettings = { target: 'my-canvas' };
        let confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
        const audio = new Audio(winSound)
        audio.play()
      }
    }
  },

  mounted() {
    const isMobile = {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
      },
      any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
    };

    this.mobile = isMobile.any()
  },
  computed: {
    width () {
      return this.mobile ? "100%" : "50%"
    },
    grid () {
      return this.mobile ? "repeat(1, 1fr)" : "repeat(5, 1fr)"
    },
    applyBackground() {
      if (this.mobile) {
        if (this.Names.split(' ').filter(r => r !== '').length >= 4) {
          return "containerRepeated"
        }
        return "container"
      } else {
        if (this.Names.split(' ').filter(r => r !== '').length >= 11) {
          return "containerRepeated"
        }
        return "container"
      }
    },
  },
  methods: {
    calculate: function() {
      this.$store.commit('Users/start')
      this.$store.commit('Users/calculate')
    },
  }
}
</script>

<style scoped>
.container {
  background: url('~assets/back.jpg');
  background-position: center;
  width: 100%;
  height: 100vh;
  background-position: 0% 0%;
  backdrop-size: 100%, 100%;
  background-repeat: repeat;
}

.containerRepeated {
  background: url('~assets/back.jpg');
  background-position: center;
  width: 100%;
  height: 100%;
  background-position: 0% 0%;
  background-repeat: repeat;
}
.mycanvas {
  position:absolute;
  top:0px;
  left:0px;
  z-index:1;
  height: 100%;
  width: 100%
}
</style>

