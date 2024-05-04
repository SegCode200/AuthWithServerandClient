import create from "zustand"


export const useAuthStore= create ((set)=>({
    auth:{
        username: "",
        active: false
    },
    setUsername :(name:any)=>set((state:any)=>({auth : {...state.auth, username: name} }))
}))