import React from 'react';

import {
  Text,
  Body,
  Header,
  Left,
  Icon,
  Right,
  Button,
  ActionSheet,
} from 'native-base';

function SelectionListHeader(props) {
  const onPressSelectionActions = () => {
    ActionSheet.show(
      {
        options: props.selectActions.map(action => action.name),
        cancelButtonIndex: props.selectActions.length - 1,
      },
      buttonIndex => {
        onExecuteAction(buttonIndex);
      },
    );
  };

  const onExecuteAction = index => {
    if (props.selectActions[index].method) {
      props.selectActions[index].method.apply();
    }
  };

  return (
    <Header>
      {props.selectionMode ? (
        <Left>
          <Button transparent onPress={props.clearSelection}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
      ) : (
        <></>
      )}

      <Body>
        <Text>
          {props.selectionMode ? props.selectedItemsCount : props.title}
        </Text>
      </Body>
      <Right>
        {props.selectionMode ? (
          <>
            <Button transparent>
              <Icon
                name="ios-options"
                onPress={onPressSelectionActions}
                style={{paddingLeft: 25, paddingTop: 10, paddingBottom: 10}}
              />
            </Button>
          </>
        ) : (
          <></>
        )}
      </Right>
    </Header>
  );
}

export default SelectionListHeader;