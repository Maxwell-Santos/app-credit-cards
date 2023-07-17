import { Button, Modal } from "native-base";
import { useState } from "react";
import { Text } from "react-native";

export function ModalReset({open = false}) {

  const [showModal, setShowModal] = useState(open)
  
  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      _overlay={{useRNModalOnAndroid: true}}
    >
      <Modal.Content h={500}>
        {/* <Modal.CloseButton /> */}
        <Modal.Header>Titulo do modal</Modal.Header>

        <Modal.Body>
          <Text>Texto do modal</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setShowModal(false);
            }}>
              Cancelar
            </Button>
            <Button onPress={() => {
              setShowModal(false);
            }}>
              Resetar os dados
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
