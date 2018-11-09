import router from '../../router'


export default {
    namespaced: true,

    state: {
        tabs: [],

        currentMenu: null
    },

    mutations: {

    },

    actions: {

        // 打开tab
        openTab({ state, commit, rootState }, name) {
            let tab = undefined, index = state.tabs.findIndex(i => i.name == name);

            if (index == -1) {

                let menu = null
                for (let i of rootState.sysManage.sysMenuList.values()) {
                    if (i.menuName == name) {
                        menu = i
                        break
                    } else if (Reflect.has(i, 'children')){
                        for (let j of i.children.values()) {
                            if (j.menuName == name) {
                                menu = j
                                break
                            }
                        }
                    }
                }

                state.tabs.push({
                    name,
                    label: menu.menuLabel,
                    mount: true
                })
            } else {
                tab = state.tabs[index]
                if (tab.mount == false) {
                    tab.mount = true
                    state.tabs.splice(index, 1)
                    state.tabs.push(tab)
                }
            }
            state.currentMenu = name
            router.replace({ name })
        },

        // 关闭tab
        closeTab({ state, commit }, name) {
            let mounted = state.tabs.filter(i => i.mount == true)
            let index = mounted.findIndex(i => i.name == name)
            mounted[index].mount = false

            let nextRoute = 'Index', nextMenu = null;

            if (name == state.currentMenu) {
                if (index == 0) {
                    let t = mounted[index + 1]
                    if (t != undefined) {
                        alert(t.name)
                        nextRoute = nextMenu = t.name
                    }
                } else if (index == mounted.length - 1) {
                    let t = mounted[index - 1]
                    if (t != undefined) {
                        nextRoute = nextMenu = t.name
                    }
                } else {
                    let t = mounted[index + 1]
                    nextRoute = nextMenu = t.name
                }
                state.currentMenu = nextMenu
                router.replace({ name: nextRoute })
            }
        }
    },

    getter: { 

    }
}