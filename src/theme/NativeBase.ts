import { extendTheme } from "native-base";

export const themeNB = extendTheme({
  components: {
    ActionsheetContent : {
      baseStyle: () =>  ({
        maxH: '300',
        bg: 'black'
      }),
    },
    ActionsheetItem: {
      baseStyle: ({
        bg: 'black',
        _text: {color: '#c0c0c0'},
        _pressed: {
          bg: '#8585853b',
        },
      })
    }
  }
})