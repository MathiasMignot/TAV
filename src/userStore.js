import { create } from 'zustand'

const useUserStore = create((set) => ({
 userMail: '',
 isConnected: true,
 userToken:'',
 updateUserMail: (newMail)=> set({userMail: newMail}),
 updateIsConnected: (value)=> set({isConnected: value}),
 updateUserToken: (newToken)=> set({userToken: newToken})
}))

export default useUserStore;