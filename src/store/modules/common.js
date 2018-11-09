import router from '../../router'


export default {
    namespaced: true,

    state: {
        tabs: []
    },

    mutations: {

    },

    actions: {

        // 打开tab
        openTab({ state, commit, rootState }, name) {
            let tab = undefined
            let index = state.tabs.findIndex(i => i.name == name)
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
            setTimeout(() => router.replace({ name }))
        },

        // 关闭tab
        closeTab({ state, commit }, name) {
            let mounted = state.tabs.filter(i => i.mount == true)
            let index = mounted.findIndex(i => i.name == name)
            mounted[index].mount = false

            if (index == 0) {
                let t = state.tabs[index + 1]
                if (t == undefined) {
                    setTimeout(() => router.replace({ name: 'Index' }))                    
                } else {
                    setTimeout(() => router.replace({ name: t.name }))                    
                }
            } else if (index == mounted.length - 1) {
                let t = state.tabs[index - 1]
                if (t == undefined) {
                    setTimeout(() => router.replace({ name: 'Index' }))                    
                } else {
                    setTimeout(() => router.replace({ name: t.name }))
                }
            } else {
                let t = state.tabs[index + 1]
                setTimeout(() => router.replace({ name: t.name }))
            }
        }
    },

    getter: { 

    }
}