import type { MemberWithUser, MemberWithRoomId, Room } from "@/apis"

export const RoomStore = defineStore("RoomStore", {
  state: (): { room: Room; own: MemberWithRoomId; members: MemberWithUser[] } => ({
    room: { roomId: "", roomIcon: "", roomName: "", createdTime: "", owner: { memberId: "", memberName: "", userId: "", joinTime: "", role: "user" } },
    own: { roomId: "", memberId: "", memberName: "", joinTime: "", role: "admin" },
    members: [],
  }),
  actions: {
    setRoom(room: Room) {
      this.room = room
    },
    setOwn(own: MemberWithRoomId) {
      this.own = own
    },
    setMembers(members: MemberWithUser[]) {
      this.members = members
    },
  },
})
