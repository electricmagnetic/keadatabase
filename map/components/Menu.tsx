import Link from "next/link";
import { FC, PropsWithChildren } from "react";

const logo =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIGhlaWdodD0iNjQuNjU1IiB3aWR0aD0iNDU5LjIyMiI+PGcgc3R5bGU9ImZpbGw6IzgwN2U3NztmaWxsLW9wYWNpdHk6MSI+PHBhdGggZD0ibTc3LjM4IDkyLjAyNiAyNy4xMTktMjcuMTE3YTIuNTM2IDIuNTM2IDAgMCAxIDMuNTctLjAwNCAyLjU0NSAyLjU0NSAwIDAgMS0uMDA1IDMuNTczTDgwLjk0OSA5NS41OTRhMi41MzIgMi41MzIgMCAwIDEtMy41NjgtLjAwMyAyLjUzOSAyLjUzOSAwIDAgMS0uMDAxLTMuNTY1TTcwLjI0NiA4NC44OTNsMzQuMDE1LTM0LjAxNGEyLjUzIDIuNTMgMCAwIDEgMy41NjggMCAyLjUzNyAyLjUzNyAwIDAgMS0uMDAzIDMuNTY4bC0zNC4wMTMgMzQuMDFhMi41MyAyLjUzIDAgMCAxLTMuNTY0LjAwNCAyLjUzNiAyLjUzNiAwIDAgMS0uMDA0LTMuNTY4TTYzLjExMSA3Ny43NTVsNDAuMjE2LTQwLjIxN2EyLjUzOSAyLjUzOSAwIDAgMSAzLjU3OC4wMDNjLjk3Ljk3Mi45NzMgMi41ODctLjAwMyAzLjU2Nkw2Ni42OCA4MS4zMjNhMi41MjYgMi41MjYgMCAwIDEtMy41Ni4wMDUgMi41NDIgMi41NDIgMCAwIDEtLjAwOS0zLjU3M003MC41OTkgNTkuMjY0IDQ3LjMwNyAzNS45NzJhMi41MjcgMi41MjcgMCAwIDEtLjAwNC0zLjU2OCAyLjU0MyAyLjU0MyAwIDAgMSAzLjU3IDBsMjMuMjkzIDIzLjI5MmMuOTc4Ljk4Ljk3OCAyLjU5LS4wMDIgMy41N2EyLjUzNSAyLjUzNSAwIDAgMS0zLjU2NS0uMDAyTTYzLjI4IDY2LjIxNSAzMy4yNzcgMzYuMjEyYTIuNTMgMi41MyAwIDAgMSAwLTMuNTY4IDIuNTM2IDIuNTM2IDAgMCAxIDMuNTY2IDBMNjYuODQ2IDYyLjY1YTIuNTMyIDIuNTMyIDAgMCAxIDAgMy41NjYgMi41MzUgMi41MzUgMCAwIDEtMy41NjYgME01Ni4wMzkgNzMuMjQ0IDE5LjkzNiAzNy4xNGEyLjUzNCAyLjUzNCAwIDAgMSAuMDAzLTMuNTc1Yy45NzEtLjk3IDIuNTg4LS45NzMgMy41NjUuMDA0bDM2LjEwMyAzNi4xMDRhMi41MyAyLjUzIDAgMCAxIC4wMDIgMy41NjMgMi41MzYgMi41MzYgMCAwIDEtMy41Ny4wMDdNNDYuMDY3IDc0LjQ2MnYtLjAwN3MtLjQ2NC40OTQtMS4wODggMS4zMjVjLS4wMjEuMDMzLS4wNDkuMDYyLS4wNy4wOTUtMS4zNDEgMS44MTItMy40MiA1LjI1Ny0zLjg1MyA5Ljc3NS0uNjQ0IDYuNzQ2IDIuMTgzIDEwLjY3NyAyLjE4MyAxMC42NzdzLS4zNjItMy45ODggMS42MzItNi4zOTVhOS44MzggOS44MzggMCAwIDEgMS40NTgtMS40NDJjMS43NjYgMS42NyA0LjEzNCAyLjcxMyA2Ljc1OCAyLjcxM2E5LjgzIDkuODMgMCAwIDAgNy41NDUtMy41MTZjMS40MzgtMS43MS0xMi43NzktMTUuMDQ1LTE0LjU2NS0xMy4yMjUiIHN0eWxlPSJjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiM4MDdlNzc7ZmlsbC1ydWxlOmV2ZW5vZGQ7ZmlsbC1vcGFjaXR5OjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xOS4yIC0zMS42NzMpIi8+PC9nPjxnIHN0eWxlPSJmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDo0MDA7Zm9udC1zaXplOjUwLjc4OTAyMDU0MDAwMDAwMjc3cHg7bGluZS1oZWlnaHQ6MTI1JTtmb250LWZhbWlseTpOdW5pdG87bGV0dGVyLXNwYWNpbmc6LTEuMjY5NzI1NTU5OTk5OTk5OTJweDt3b3JkLXNwYWNpbmc6MDtmaWxsOiM4MDdlNzc7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjFweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIj48cGF0aCBkPSJNMTExLjIxOSA2NC40NjJxMS40MzggMCAyLjUwNC0xLjAxNiAxLjA2Ny0xLjAxNyAxLjA2Ny0yLjYzVjQ2LjgzbDEzLjI0MiAxNS4zMjZxLjYyLjc2OS45OTIgMS4xNjYuMzcyLjM5Ni45NjguNzY4LjU5NS4zNDcgMS4xNjUuMzQ3aC4wNXExLjM2NCAwIDIuNDMtLjk2NyAxLjA5MS0uOTY3IDEuMDkxLTIuMzA2IDAtMS4zMTQtLjk2Ny0yLjYyOWwtMTEuNjMtMTIuOTcgMTAuNDY1LTExLjMzM3EuOTY3LTEuMTY2Ljk2Ny0yLjQwNiAwLTEuMjktMS4wMTctMi4xODItMS4wMTctLjkxOC0yLjMwNi0uOTE4LTEuMzQgMC0yLjkwMiAxLjkzNUwxMTQuNzkgNDQuOTJWMzIuMzQ2cTAtMS42MzctMS4wNjctMi42NTMtMS4wNjYtMS4wMTctMi41MDQtMS4wMTctMS40MzkgMC0yLjUwNSAxLjAxNy0xLjA0MiAxLjAxNi0xLjA0MiAyLjY1M3YyOC40N3EwIDEuNjM3IDEuMDQyIDIuNjUzIDEuMDQxLjk5MiAyLjUwNS45OTJ6TTE0My40NzggNjQuNDYyaDE4LjM3NnExLjE5IDAgMS44ODUtLjgxOC43MTktLjg0My43MTktMS45NiAwLTEuMTE1LS43Mi0xLjk1OC0uNjk0LS44NDQtMS44ODQtLjg0NGgtMTQuODA1di05Ljk0NGgxMy4yNjdxMS4yMTUgMCAxLjkzNS0uODE4Ljc0NC0uODE5Ljc0NC0xLjkzNXQtLjcyLTEuOTM0cS0uNzE5LS44MTktMS45NTktLjgxOUgxNDcuMDV2LTkuMTI2aDE0LjIzNHExLjIxNiAwIDEuOTM1LS44NDMuNzE5LS44NDMuNzE5LTEuOTU5dC0uNzItMS45NnEtLjcxOC0uODQyLTEuOTM0LS44NDJoLTE3LjYzMnEtMS43NiAwLTIuNzI4IDEuMTktLjk0MiAxLjE2Ni0uOTQyIDNWNjAuNDdxMCAxLjU2MiAxLjAxNyAyLjc3NyAxLjAxNiAxLjIxNSAyLjQ4IDEuMjE1ek0xOTAuMDcgNTEuNDQzaC0xMi4yNWw2LjEyNS0xNi4zNDMgNi4xMjYgMTYuMzQzem00LjAxOCAxMC43MzhxLjQyMiAxLjIxNSAxLjI5IDEuODM1Ljg2OC41OTUgMS45MzQuNTk1IDEuMzQgMCAyLjM4LS44OTMgMS4wNDItLjg5MiAxLjA0Mi0yLjI1NiAwLS42Mi0uMjQ4LTEuMjY1TDE4OS42IDMyLjk0MnEtMS4wNDEtMi43NTItMi40MDUtMy42OTUtMS4zNC0uOTQyLTMuMjQ5LS45NDItMS45MSAwLTMuMjczLjk0Mi0xLjM0Ljk0My0yLjM4MSAzLjY5NWwtMTAuODg3IDI3LjI1NXEtLjI0OC42NDUtLjI0OCAxLjI2NSAwIDEuMzY0IDEuMDQxIDIuMjU2IDEuMDQyLjg5MyAyLjM4MS44OTMgMS4wNjcgMCAxLjkzNS0uNTk1Ljg2OC0uNjIgMS4yOS0xLjgzNWwyLjIzMS01Ljk1MmgxNS44MjJsMi4yMzIgNS45NTJ6IiBzdHlsZT0iZm9udC1zdHlsZTpub3JtYWw7Zm9udC12YXJpYW50Om5vcm1hbDtmb250LXdlaWdodDo3MDA7Zm9udC1zdHJldGNoOm5vcm1hbDtmb250LWZhbWlseTpOdW5pdG87LWlua3NjYXBlLWZvbnQtc3BlY2lmaWNhdGlvbjonTnVuaXRvIEJvbGQnO2xldHRlci1zcGFjaW5nOi0xLjI2OTcyNTU1OTk5OTk5OTkycHg7ZmlsbDojODA3ZTc3O2ZpbGwtb3BhY2l0eToxIiB0cmFuc2Zvcm09InNjYWxlKC45OTkzMiAxLjAwMDY4KSIvPjwvZz48ZyBzdHlsZT0iZm9udC1zdHlsZTpub3JtYWw7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc2l6ZTo1MC41NDc0Nzc3MjAwMDAwMDMzOXB4O2xpbmUtaGVpZ2h0OjEyNSU7Zm9udC1mYW1pbHk6TnVuaXRvO2xldHRlci1zcGFjaW5nOjA7d29yZC1zcGFjaW5nOjA7ZmlsbDojODA3ZTc3O2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoxcHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSI+PHBhdGggZD0iTTIxNy44NzcgNjAuMDlWMzIuNzQxaDUuNTU0cTcuMzMgMCAxMC43MzYgMy4xNiAzLjQwNiAzLjE1OSAzLjQwNiAxMC41MTQgMCAzLjQ4LS42OSA1Ljk3My0uNjkyIDIuNDY4LTIuMjQ3IDQuMjQ1LTEuNTMgMS43NTItNC4wOTcgMi42MTYtMi41NjcuODQtNi4yNjkuODRoLTYuMzkzem0tMi40OTIgMy45NDhoOC42MzhxOC45NiAwIDEzLjg0Ni00LjQ5MiA0Ljg4Ny00LjUxNyA0Ljg4Ny0xMy4wNTYgMC04LjY2My00LjgzNy0xMy4xOC00LjgzOC00LjU0Mi0xNC4xMTgtNC41NDJoLTguNDE2cS0xLjAzNyAwLTEuNzc3LjcxNi0uNzE2LjY5MS0uNzE2IDEuNzAzVjYxLjYycTAgMS4wMTIuNzE2IDEuNzI4Ljc0LjY5MSAxLjc3Ny42OTF6TTI3Mi45NzEgNjIuNjMxcS42MTcgMS42MyAyLjI3IDEuNjMuOTY0IDAgMS43MjktLjYxOC43NjUtLjYxNy43NjUtMS41NTUgMC0uMzk1LS4xOTgtLjkxM2wtMTEuNzIzLTI5LjFxLS44NC0yLjA5Ny0xLjgyNy0yLjc2NC0uOTYyLS42OS0yLjQxOS0uNjktMS40NTYgMC0yLjQ0My42OS0uOTYzLjY2Ny0xLjgwMiAyLjc2NWwtMTEuNzIzIDI5LjFxLS4xOTguNTE3LS4xOTguOTEyIDAgLjkzOC43NCAxLjU1NS43NjYuNjE3IDEuNzI4LjYxNyAxLjY3OSAwIDIuMjk2LTEuNjI5bDIuOTEyLTcuNTAzaDE2Ljk4bDIuOTEzIDcuNTAzem0tNC4zMTktMTEuMDgyaC0xNC4xNjdsNy4wODMtMTguMjQgNy4wODQgMTguMjR6TTI5MS44ODIgNjQuMTEycTEuMDEyIDAgMS43NTMtLjY0Mi43NC0uNjQxLjc0LTEuNzUyVjMyLjgxNmg5LjE4MXEuOTYzIDAgMS41MDYtLjU5Mi41NDMtLjU5My41NDMtMS40MDcgMC0uODE0LS41NDMtMS4zODItLjUxOC0uNTkzLTEuNTA2LS41OTNoLTIzLjQ3MnEtLjk2MiAwLTEuNTA1LjU5My0uNTQzLjU5Mi0uNTQzIDEuMzgyIDAgLjgxNC41NDMgMS40MDcuNTQzLjU5MiAxLjUwNS41OTJoOS4zMDV2MjguOTAycTAgMS4xMS43NCAxLjc1Mi43NDEuNjQyIDEuNzUzLjY0MnpNMzMzLjM1MiA2Mi42MzFxLjYxNyAxLjYzIDIuMjcgMS42My45NjMgMCAxLjcyOC0uNjE4Ljc2NS0uNjE3Ljc2NS0xLjU1NSAwLS4zOTUtLjE5Ny0uOTEzbC0xMS43MjQtMjkuMXEtLjgzOS0yLjA5Ny0xLjgyNi0yLjc2NC0uOTYzLS42OS0yLjQxOS0uNjl0LTIuNDQzLjY5cS0uOTYzLjY2Ny0xLjgwMiAyLjc2NWwtMTEuNzI0IDI5LjFxLS4xOTcuNTE3LS4xOTcuOTEyIDAgLjkzOC43NCAxLjU1NS43NjUuNjE3IDEuNzI4LjYxNyAxLjY3OCAwIDIuMjk1LTEuNjI5bDIuOTEzLTcuNTAzaDE2Ljk4bDIuOTEzIDcuNTAzem0tNC4zMi0xMS4wODJoLTE0LjE2N2w3LjA4NC0xOC4yNCA3LjA4NCAxOC4yNHpNMzQ3LjA4IDQ0LjA0NlYzMi42NjhoNy4yNTZxMS4zNTcgMCAyLjM0NS4xMjQgMS4wMTIuMDk4IDIuMDI0LjQyIDEuMDExLjMyIDEuNjUzLjg4OC42NDIuNTY3IDEuMDM3IDEuNTMuNDIuOTYyLjQyIDIuMjk1IDAgMy4yNTgtMS45MjYgNC42OS0xLjkgMS40MzEtNi4wNzEgMS40MzFoLTYuNzM4em0wIDE2LjE5MVY0Ny44NzJoNi4xOTVxNS4wMzUgMCA3LjM1NSAxLjMwOCAyLjMyIDEuMzA4IDIuMzIgNC44NjIgMCAzLjYwNC0xLjg3NiA0LjkxMi0xLjg1MSAxLjI4My02LjAyMiAxLjI4M2gtNy45NzJ6bS0yLjQ5MyAzLjg3NWgxMS40NzdxMy4wMSAwIDUuMzgtLjc5dDMuNzc2LTIuMTIycTEuNDMyLTEuMzU4IDIuMTcyLTMuMDExLjc0LTEuNjc5Ljc0LTMuNTMgMC0zLjkyNC0yLjI5NS02LjE3LTIuMjctMi4yNy02LjI5My0yLjcxNXYtLjA5OXEzLjQzLS40NDQgNS4yNTctMi42NjUgMS44NS0yLjIyMiAxLjg1LTUuMzggMC00LjE3Mi0yLjk2LTYuNDY3LTIuOTYzLTIuMzItOS4xNTgtMi4zMmgtOS45NDZxLTEuMDEyIDAtMS43MjguNjktLjcxNi42OTItLjcxNiAxLjcwNHYzMC40ODFxMCAuOTg3LjcxNiAxLjcwMy43MTYuNjkxIDEuNzI4LjY5MXpNMzk3LjM4NSA2Mi42MzFxLjYxNyAxLjYzIDIuMjcgMS42My45NjMgMCAxLjcyOS0uNjE4Ljc2NS0uNjE3Ljc2NS0xLjU1NSAwLS4zOTUtLjE5OC0uOTEzbC0xMS43MjMtMjkuMXEtLjg0LTIuMDk3LTEuODI3LTIuNzY0LS45NjItLjY5LTIuNDE5LS42OS0xLjQ1NiAwLTIuNDQzLjY5LS45NjMuNjY3LTEuODAyIDIuNzY1bC0xMS43MjMgMjkuMXEtLjE5OC41MTctLjE5OC45MTIgMCAuOTM4Ljc0IDEuNTU1Ljc2Ni42MTcgMS43MjguNjE3IDEuNjc5IDAgMi4yOTYtMS42MjlsMi45MTItNy41MDNoMTYuOThsMi45MTMgNy41MDN6bS00LjMxOS0xMS4wODJoLTE0LjE2N2w3LjA4My0xOC4yNCA3LjA4NCAxOC4yNHpNNDE3LjUwNSA2NC42NTVxNi4xMjEgMCA5LjY3Ni0yLjY5IDMuNTc4LTIuNjkgMy41NzgtNy41MjggMC0yLS42MTctMy41My0uNTkyLTEuNTMtMS44MjYtMi42MTYtMS4yMS0xLjExLTIuNzE1LTEuODc1LTEuNDgtLjc2NS0zLjYyOC0xLjQ1N2wtNy4xMDgtMi4yOTVxLTIuNTE4LS44NC0zLjY3OC0xLjk3NC0xLjEzNS0xLjE2LTEuMTM1LTMuMDg2IDAtMi41NjYgMi4yMjEtMy45MjQgMi4yMjEtMS4zNTcgNS45MjQtMS4zNTcgMi41OTEgMCA0Ljg2Mi44MzkgMi4yOTUuODE0IDMuOCAxLjgwMS41MTkuMzQ2IDEuMDg3LjM0Ni43OSAwIDEuMzU3LS42MTcuNTY4LS42MTcuNTY4LTEuMzgyIDAtLjc0LS41NjgtMS4yMzQtMS42NzgtMS41MDYtNC44NjItMi42MTYtMy4xNi0xLjEzNi02LjY0LTEuMTM2LTMuNTUzIDAtNi4zOTIgMS4xMS0yLjgxNCAxLjExMi00LjQ5MiAzLjI4My0xLjY1NCAyLjE3Mi0xLjY1NCA1LjAzNSAwIDMuNTU1IDEuOTI2IDUuNTc4IDEuOTI1IDIuMDI0IDUuODUgMy4zNTdsNy4wODMgMi4zN3ExLjU4LjU0MyAyLjU2NyAxLjAxMS45ODcuNDcgMS43NTIgMS4xNi43OS42OTIgMS4xMSAxLjYzLjM0Ni45MTMuMzQ2IDIuMjIgMCAyLjcxNi0yLjI5NSA0LjE0Ny0yLjI3IDEuNDMyLTUuODc0IDEuNDMyLTUuNTI5IDAtOS43MjUtMy4yNTgtLjI3MS0uMTk4LS42MTctLjE5OC0uNzY1IDAtMS41My44NC0uNzQuODM5LS43NCAxLjYyOSAwIC40NjguMjk2Ljc0IDQuNTY2IDQuMjQ1IDEyLjA5MyA0LjI0NXpNNDM4LjQ0IDY0LjExMmgxOC44MDdxLjkzOCAwIDEuNDU3LS41NjcuNTE4LS41OTMuNTE4LTEuNDA3IDAtLjgxNS0uNTE4LTEuNDA3LS41MTktLjU5My0xLjQ1Ny0uNTkzaC0xNi4yOVY0Ny45MjFoMTQuODFxLjkzNyAwIDEuNDU2LS41NjcuNTQzLS41OTMuNTQzLTEuMzgzdC0uNTE5LTEuMzU3cS0uNTE4LS41NjgtMS40OC0uNTY4aC0xNC44MXYtMTEuMjNoMTUuNjQ5cS45MzggMCAxLjQ1Ni0uNTkyLjUxOC0uNTkzLjUxOC0xLjQwNyAwLS44MTQtLjUxOC0xLjM4Mi0uNTE4LS41OTMtMS40NTYtLjU5M2gtMTguMjlxLS45ODYgMC0xLjY3OC43NC0uNjY2LjcxNy0uNjY2IDEuNjh2MzAuNDMxcTAgLjk2My43NCAxLjcwMy43NjYuNzE2IDEuNzI4LjcxNnoiIHN0eWxlPSJmb250LXN0eWxlOm5vcm1hbDtmb250LXZhcmlhbnQ6bm9ybWFsO2ZvbnQtd2VpZ2h0OjQwMDtmb250LXN0cmV0Y2g6bm9ybWFsO2ZvbnQtZmFtaWx5Ok51bml0bzstaW5rc2NhcGUtZm9udC1zcGVjaWZpY2F0aW9uOk51bml0bztsZXR0ZXItc3BhY2luZzotMS44OTU1MzA0NjAwMDAwMDAwM3B4O2ZpbGw6IzgwN2U3NztmaWxsLW9wYWNpdHk6MSIvPjwvZz48L3N2Zz4=";

const Menu: FC<PropsWithChildren<{ title?: string }>> = ({
  title,
  children,
}) => {
  return (
    <nav className="navbar bg-light fixed-top navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          <img
            alt="Kea Database"
            height="25"
            className="d-inline-block me-2"
            src={logo}
          />
        </Link>
        {title && (
          <div className="d-flex">
            <span className="navbar-text">{title}</span>
          </div>
        )}
        {children && <div>{children}</div>}
        <div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/fwf">
                FWF Observations
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/track">
                Track Bird
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/zones">
                Zones
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;