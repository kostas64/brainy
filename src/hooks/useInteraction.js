import React from 'react';
import {InteractionManager} from 'react-native';

export const useInteraction = cb => {
  const interaction = React.useRef();

  React.useEffect(() => {
    interaction.current = InteractionManager.runAfterInteractions(() => {
      !!cb && cb();
    });

    return () => {
      InteractionManager.clearInteractionHandle(interaction.current);
      interaction.current = null;
    };
  }, [cb]);
};
