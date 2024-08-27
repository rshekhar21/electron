const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('ebs', {
    node: ()=> process.version.node,
    test: (args)=>ipcRenderer.invoke('test', args)
})