'use client';
import { MouseEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Dialog from './dialog';

type API = {
  onDecline: (event: MouseEvent<HTMLButtonElement>) => void;
  onConfirmation: (event: MouseEvent<HTMLButtonElement>) => void;
  showModal: boolean;
};

type DialogPortalProps = {
  children: (api: API) => ReactNode;
  containerNode?: Element | DocumentFragment;
  handleConfirmation?: (event: MouseEvent<HTMLButtonElement>) => void;
  handleDecline?: (event: MouseEvent<HTMLButtonElement>) => void;
  showModal: boolean;
};

const DialogPortal = ({
  children,
  containerNode,
  handleConfirmation,
  handleDecline,
  showModal: parentShowModal,
  ...rest
}: DialogPortalProps) => {
  const hasRun = useRef(parentShowModal);
  const [showModal, setShowModal] = useState<boolean>(hasRun.current);

  useEffect(() => {
    setShowModal(parentShowModal);
  }, [setShowModal, parentShowModal]);

  const onConfirmation = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (handleConfirmation) {
        handleConfirmation(event);
      } else {
        setShowModal(false);
      }
    },
    [handleConfirmation]
  );

  const onDecline = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (handleDecline) {
        handleDecline(event);
      } else {
        setShowModal(false);
      }
    },
    [handleDecline]
  );

  const getChildrenProps = () => ({
    onDecline,
    onConfirmation,
    showModal
  });

  return showModal
    ? createPortal(
        <Dialog {...rest}>{children(getChildrenProps())}</Dialog>,
        containerNode ?? document?.body
      )
    : null;
};

export default DialogPortal;
