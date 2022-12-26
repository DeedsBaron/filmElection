<template>
  <div class="Participant">
    <CFlex>
        <CAvatar :name="name" :src="name + '.jpg'" />
        <CBox ml="3">
          <CText font-weight="bold">{{name}}</CText>
          <CText font-size="sm">Films: </CText>

          <CStack spacing="2">
            <CInput :class="animations"
                    variant="outline"
                    placeholder=""
                    v-model="film0"
                    :key="this.$store.state.Users.reRender"
            />
            <CInput class="animate__animated animate__rollIn animate__slow"
                    variant="outline"
                    placeholder=""
                    v-model="film1"
            />
            <CInput class="animate__animated animate__rollIn animate__slow"
                    variant="outline"
                    placeholder=""
                    v-model="film2"
            />
          </CStack>
        </CBox>
    </CFlex>
  </div>
</template>

<script lang="js">
import { CFlex, CAvatar, CBox, CText, CInput, CStack, CButton } from '@chakra-ui/vue'
import 'animate.css';

export default {

  name: "Participant",
  props: ["name", "index"],
  components: {
    CFlex,
    CAvatar,
    CBox,
    CText,
    CInput,
    CStack,
    CButton
  },

  data() {
    return {
      reRender: 0,
    }
  },

  watch: {
    name: function (newValue) {
      this.$store.commit('Users/updateUser', {name: newValue, index:this.index})
    },
  },

  computed:{
    film0: {
      get() {
        return this.$store.state.Users.Users[this.index].film0
      },
      set(value) {
        this.$store.commit('Users/updateFilms', {film: value, userIndex: this.index, filmIndex: 0})
      }
    },
    film1: {
      get() {
        return this.$store.state.Users.Users[this.index].film1
      },
      set(value) {
        this.$store.commit('Users/updateFilms', {film: value, userIndex: this.index, filmIndex: 1})
      }
    },
    film2: {
      get() {
        return this.$store.state.Users.Users[this.index].film2
      },
      set(value) {
        this.$store.commit('Users/updateFilms', {film: value, userIndex: this.index, filmIndex: 2})
      }
    },
    animations () {
      if (this.film0 == undefined) {
        return "animate__animated animate__rotateOut animate__slow"
      }
      else
        return "animate__animated animate__rollIn animate__slow"
    }
  },

  created() {
    this.$store.commit('Users/addUser', this.name)
  },

  beforeDestroy() {
    this.$store.commit('Users/destroyUser', this.index)
  }

}
</script>
