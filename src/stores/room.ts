import type { MemberWithRoomId, Room } from "@/apis"

export const RoomStore = defineStore("RoomStore", {
  state: (): { room: Room; member: MemberWithRoomId } => ({
    room: { roomId: "", roomIcon: "", roomName: "", createdTime: "", owner: { memberId: "", memberName: "", userId: "", joinTime: "", role: "user" } },
    member: { roomId: "", memberId: "", memberName: "", joinTime: "", role: "admin" },
  }),
  actions: {
    setRoom(room: Room) {
      this.room = room
    },
    setMember(member: MemberWithRoomId) {
      this.member = member
    },
  },
})
