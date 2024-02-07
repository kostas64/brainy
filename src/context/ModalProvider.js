import React from 'react';

import BottomSheet from '../components/common/BottomSheet';

const ModalContext = React.createContext();

const initialState = {
  content: null,
  height: null,
  panEnabled: true,
  withoutLine: true,
  onBackPress: () => {},
  contentContainerStyle: {},
};

export const ModalProvider = ({children}) => {
  const bottomSheetRef = React.useRef();

  const [modalInfo, setModalInfo] = React.useState(initialState);

  //** ----- FUNCTIONS -----
  const closeModal = React.useCallback(() => {
    bottomSheetRef?.current?.scrollTo(0);
  }, []);

  const resetModal = React.useCallback(() => {
    setModalInfo(initialState);
  }, []);

  //** ----- EFFECTS -----
  React.useEffect(() => {
    if (modalInfo.content && modalInfo.height) {
      bottomSheetRef?.current?.scrollTo(-modalInfo.height);
    }
  }, [modalInfo]);

  return (
    <ModalContext.Provider
      value={{modalInfo, setModalInfo, resetModal, closeModal}}>
      {children}
      <BottomSheet
        ref={bottomSheetRef}
        withoutLine={modalInfo.withoutLine}
        panEnabled={modalInfo.panEnabled}
        onBackPress={modalInfo.onBackPress}
        modalHeight={modalInfo.height || 0}
        contentContainerStyle={modalInfo.contentContainerStyle}>
        {modalInfo.content}
      </BottomSheet>
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return React.useContext(ModalContext);
};
