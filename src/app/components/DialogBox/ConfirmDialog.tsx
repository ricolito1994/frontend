import React, {} from 'react'

import DialogBox from './DialogBox';

const ConfirmDialog: React.FC <any> = ({

}): React.ReactElement => {
    return (
        <DialogBox
            isOpen={false}
            setIsOpen={()=>{}}
            modalTitle={'Confirmation'}
            form={null}
            handleClose={()=>{}}
            onSave={()=>{}}
        >
            <h1>Are you sure?</h1>
        </DialogBox>
    )
}

export default ConfirmDialog;