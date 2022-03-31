import React from 'react';
import { ThemeContext } from '../themes';

export const useThemeContext = () => React.useContext(ThemeContext);
