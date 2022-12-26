<template>
  <div :class="applyBack">
    <c-heading text-align="start" mb="4">
      <c-grid :w="width" template-columns="repeat(6, 1fr)" gap="6">
        <c-box class="box" w="100%" h="10" bg="#FBB6CE" display="flex" align-items="center" justify-content="center">🎞️</c-box>
        <c-box w="100%" h="10" bg="#F687B3" display="flex" align-items="center" justify-content="center">F</c-box>
        <c-box w="100%" h="10" bg="#ED64A6" display="flex" align-items="center" justify-content="center">I</c-box>
        <c-box w="100%" h="10" bg="#D53F8C" display="flex" align-items="center" justify-content="center">L</c-box>
        <c-box w="100%" h="10" bg="#B83280" display="flex" align-items="center" justify-content="center">M</c-box>
        <c-box w="100%" h="10" bg="#97266D" display="flex" align-items="center" justify-content="center">S</c-box>
      </c-grid>
    </c-heading>


    <c-input placeholder="Names" v-model="Names" />
    <br>
    <c-grid
            w="100%"
            :template-columns="grid"
            gap="6">

      <c-box v-for="(Name, index) in Names.split(' ').filter(r => r !== '')" :key="index">
        <Participant :name="Name"  :index="index">
        </Participant>
      </c-box>

    </c-grid>
    <br>
    <CButton v-on:click="calculate()">Next Round</CButton>

<!--    <p>{{users()[0]}}</p>-->
<!--    <p>{{users()[1]}}</p>-->

    <!--    <p>{{message}}</p>-->
<!--    <Participant name="Егор"></Participant>-->
<!--    <div v-for="(phone, index) in Names">-->
<!--      <p>{{ phone,index }} </p>-->
<!--    </div>-->
<!--    <CBox-->
<!--      v-bind="mainStyles[colorMode]"-->
<!--      d="flex"-->
<!--      w="100vw"-->
<!--      h="100vh"-->
<!--      flex-dir="column"-->
<!--      justify-content="center"-->
<!--    >-->


<!--      <CFlex justify="center" direction="column" align="center">-->
<!--        <CBox mb="3">-->
<!--          <CIconButton-->
<!--            mr="3"-->
<!--            :icon="colorMode === 'light' ? 'moon' : 'sun'"-->
<!--            :aria-label="`Switch to ${-->
<!--              colorMode === 'light' ? 'dark' : 'light'-->
<!--            } mode`"-->
<!--            @click="toggleColorMode"-->
<!--          />-->
<!--          <CButton-->
<!--            left-icon="info"-->
<!--            variant-color="blue"-->
<!--            @click="showToast"-->
<!--          >-->
<!--            Show Toast-->
<!--          </CButton>-->
<!--        </CBox>-->
<!--        <CAvatarGroup>-->
<!--          <CAvatar-->
<!--            name="Evan You"-->
<!--            alt="Evan You"-->
<!--            src="https://pbs.twimg.com/profile_images/1206997998900850688/cTXTQiHm_400x400.jpg"-->
<!--          >-->
<!--            <CAvatarBadge size="1.0em" bg="green.500" />-->
<!--          </CAvatar>-->
<!--          <CAvatar-->
<!--            name="Jonathan Bakebwa"-->
<!--            alt="Jonathan Bakebwa"-->
<!--            src="https://res.cloudinary.com/xtellar/image/upload/v1572857445/me_zqos4e.jpg"-->
<!--          >-->
<!--            <CAvatarBadge size="1.0em" bg="green.500" />-->
<!--          </CAvatar>-->
<!--          <CAvatar-->
<!--            name="Segun Adebayo"-->
<!--            alt="Segun Adebayo"-->
<!--            src="https://pbs.twimg.com/profile_images/1169353373012897802/skPUWd6e_400x400.jpg"-->
<!--          >-->
<!--            <CAvatarBadge size="1.0em" bg="green.500" />-->
<!--          </CAvatar>-->
<!--          <CAvatar src="pop">-->
<!--            <CAvatarBadge size="1.0em" border-color="papayawhip" bg="tomato" />-->
<!--          </CAvatar>-->
<!--        </CAvatarGroup>-->
<!--        <CButton-->
<!--          left-icon="close"-->
<!--          variant-color="red"-->
<!--          mt="3"-->
<!--          @click="showModal = true"-->
<!--        >-->
<!--          Delete Account-->
<!--        </CButton>-->
<!--        <CModal :is-open="showModal">-->
<!--          <CModalOverlay />-->
<!--          <CModalContent>-->
<!--            <CModalHeader>Are you sure?</CModalHeader>-->
<!--            <CModalBody>Deleting user cannot be undone</CModalBody>-->
<!--            <CModalFooter>-->
<!--              <CButton @click="showModal = false">-->
<!--                Cancel-->
<!--              </CButton>-->
<!--              <CButton-->
<!--                margin-left="3"-->
<!--                variant-color="red"-->
<!--                @click="showModal = false"-->
<!--              >-->
<!--                Delete User-->
<!--              </CButton>-->
<!--            </CModalFooter>-->
<!--            <CModalCloseButton @click="showModal = false" />-->
<!--          </CModalContent>-->
<!--        </CModal>-->
<!--      </CFlex>-->
<!--    </CBox>-->
  </div>
</template>

<script lang="js">
import Participant from '@/components/Participant.vue'
import {
  CBox,
  CButton,
  CAvatarGroup,
  CAvatar,
  CAvatarBadge,
  CModal,
  CModalContent,
  CModalOverlay,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CModalCloseButton,
  CIconButton,
  CFlex,
  CHeading,
  CInput,
  CGrid,
  CGridItem
} from '@chakra-ui/vue'

export default {
  name: 'IndexPage',
  components: {
    CBox,
    CButton,
    CAvatarGroup,
    CAvatar,
    CAvatarBadge,
    CModal,
    CModalContent,
    CModalOverlay,
    CModalHeader,
    CModalFooter,
    CModalBody,
    CModalCloseButton,
    CIconButton,
    CFlex,
    CHeading,
    CInput,
    CGrid,
    CGridItem,
    Participant
  },
  inject: ['$chakraColorMode', '$toggleColorMode'],

  data () {
    return {
      mobile: false,
      Names:'',
      message:'',
      showModal: false,
      mainStyles: {
        dark: {
          bg: 'gray.700',
          color: 'whiteAlpha.900'
        },
        light: {
          bg: 'white',
          color: 'gray.900'
        }
      }
    }
  },
  created() {
    this.$store.commit('Users/clearStore')
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
    colorMode () {
      return this.$chakraColorMode()
    },
    theme () {
      return this.$chakraTheme()
    },
    toggleColorMode () {
      return this.$toggleColorMode
    },
    width () {
      return this.mobile ? "100%" : "50%"
    },
    grid () {
      return this.mobile ? "repeat(1, 1fr)" : "repeat(5, 1fr)"
    },
    applyBack() {
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
    showToast () {
      this.$toast({
        item: "Hello",
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 10000,
        isClosable: true
      })
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

</style>

