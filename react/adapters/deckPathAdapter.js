import React from "react";
export default {
        getLastIdFromPath: path=>{
        if(path.length == 0)
            return null;
        return path[path.length - 1].id;    
        },
        cloneAndPushOne:(path, newPath)=>{
            return path.concat([newPath]);
        },
        cloneAndDropFromRight:(path, limitToDrop)=>{
            return _.dropRight(path.slice(), limitToDrop);
    }
};