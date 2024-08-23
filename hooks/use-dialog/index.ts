import { useCallback, useState } from 'react';

const useDialog = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    setOpenDialog(false);
  }, []);

  return { openDialog, handleOpenDialog, handleDialogClose };
};

export default useDialog;
