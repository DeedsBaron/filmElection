export const state = () => ({
  Users: [
    {
      name: null,
      film0: '',
      film1: '',
      film2: '',
      win:[]
    }
  ],

  started:false,

  reRender:0
})

export const mutations = {
  addUser(state, name) {
    state.Users.push({name:name, film0: '', film1: '', film2: '', win: [0,0,0]})
  },

  updateUser(state, {name, index}) {
    state.Users[index].name = name
  },

  start(state){
    state.started = true
  },

  updateFilms(state, {film, userIndex, filmIndex}) {
    switch (filmIndex) {
      case 0:
        state.Users[userIndex].film0 = film
        break
      case 1:
        state.Users[userIndex].film1 = film
        break
      case 2:
        state.Users[userIndex].film2 = film
        break
    }
    console.log(state.Users[userIndex].film0, state.Users[userIndex].film1,state.Users[userIndex].film2)
  },

  clearStore(state) {
    state.Users = []
    state.started = false
  },

  destroyUser(state, index) {
    state.Users.splice(index, 1)
  },

  calculate(state) {
    let set = new Set();

    let films = 0
    for (let i = 0; i < state.Users.length; i++) {
      for (let j = 0; j < 3; j++) {
        switch (j) {
          case 0:
            if (state.Users[i].film0 != '') {
              films++
            }
            break
          case 1:
            if (state.Users[i].film0 != '') {
              films++
            }
            break
          case 2:
            if (state.Users[i].film0 != '') {
              films++
            }
            break
        }
      }
    }
    if (films === 1)
      return

    let counterloops = Math.floor(films/3)
    if (counterloops === 0) {
      counterloops = 1
    }
    console.log("films", films, "counterloops", counterloops)
    for (; counterloops > 0;) {
      console.log(counterloops);
      (function () {
        while (true){
          let generated = Math.floor(Math.random() * state.Users.length * 3)
          let userIndex = Math.floor(generated/3)
          let filmIndex = generated % 3

          switch (filmIndex) {
            case 0:
              if (state.Users[userIndex].film0 !== ''
                && state.Users[userIndex].win[filmIndex] != 3) {
                state.Users[userIndex].win[filmIndex] += 1
              }
              break
            case 1:
              if (state.Users[userIndex].film1 !== ''
                && state.Users[userIndex].win[filmIndex] != 3) {
                state.Users[userIndex].win[filmIndex] += 1
              }
              break
            case 2:
              if (state.Users[userIndex].film2 !== ''
                && state.Users[userIndex].win[filmIndex] != 3) {
                state.Users[userIndex].win[filmIndex] += 1
                break
              }
          }


          switch (filmIndex) {
            case 0:
              if (!set.has(state.Users[userIndex].film0) && state.Users[userIndex].win[filmIndex] === 3) {
                set.add(state.Users[userIndex].film0)
                return
              }
              break
            case 1:
              if (!set.has(state.Users[userIndex].film1) && state.Users[userIndex].win[filmIndex] === 3) {
                set.add(state.Users[userIndex].film1)
                return
              }
              break
            case 2:
              if (!set.has(state.Users[userIndex].film2) && state.Users[userIndex].win[filmIndex] === 3) {
                set.add(state.Users[userIndex].film2)
                return
              }
              break
          }
        }
      }());
      counterloops--
    }

    for (let i = 0; i < state.Users.length; i++){
      for (let j =0; j < 3; j++) {
        switch (j) {
          case 0:
            if (state.Users[i].win[j] != 3){
              state.Users[i].film0 = ''
            }
            break
          case 1:
            if (state.Users[i].win[j] != 3) {
              state.Users[i].film1 = ''
            }
            break
          case 2:
            if (state.Users[i].win[j] != 3) {
              state.Users[i].film2 = ''
            }
            break
        }
        state.Users[i].win[j] = 0
      }
    }
    state.reRender += 1
  }
}
