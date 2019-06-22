import React from 'react';
import TestUtils from 'react-dom/test-utils';

import Formsy from './..';
import { InputFactory } from '../__test_utils__/TestInput';

const TestInput = InputFactory({
  render: function() {
    return <input value={this.props.value} readOnly />;
  },
});

class TestForm extends React.Component {
  render() {
    return (
      <Formsy>
        <TestInput
          name="foo"
          validations="isAlpha"
          value={this.props.inputValue}
        />
      </Formsy>
    );
  }
}

describe('isAlpha', () => {
  it('should pass with a default value', () => {
    const form = TestUtils.renderIntoDocument(<TestForm />);
    const inputComponent = TestUtils.findRenderedComponentWithType(
      form,
      TestInput,
    );
    expect(inputComponent.isValid()).toEqual(true);
  });

  it('should pass with a string is only latin letters', () => {
    const form = TestUtils.renderIntoDocument(
      <TestForm inputValue="myValue" />,
    );
    const inputComponent = TestUtils.findRenderedComponentWithType(
      form,
      TestInput,
    );
    expect(inputComponent.isValid()).toEqual(true);
  });

  it('should fail with a string with numbers', () => {
    const form = TestUtils.renderIntoDocument(
      <TestForm inputValue="myValue42" />,
    );
    const inputComponent = TestUtils.findRenderedComponentWithType(
      form,
      TestInput,
    );
    expect(inputComponent.isValid()).toEqual(false);
  });

  it('should pass with an undefined', () => {
    const form = TestUtils.renderIntoDocument(
      <TestForm inputValue={undefined} />,
    );
    const inputComponent = TestUtils.findRenderedComponentWithType(
      form,
      TestInput,
    );
    expect(inputComponent.isValid()).toEqual(true);
  });

  it('should pass with a null', () => {
    const form = TestUtils.renderIntoDocument(<TestForm inputValue={null} />);
    const inputComponent = TestUtils.findRenderedComponentWithType(
      form,
      TestInput,
    );
    expect(inputComponent.isValid()).toEqual(true);
  });

  it('should pass with an empty string', () => {
    const form = TestUtils.renderIntoDocument(<TestForm inputValue={''} />);
    const inputComponent = TestUtils.findRenderedComponentWithType(
      form,
      TestInput,
    );
    expect(inputComponent.isValid()).toEqual(true);
  });

  it('should fail with a number', () => {
    const form = TestUtils.renderIntoDocument(<TestForm inputValue={42} />);
    const inputComponent = TestUtils.findRenderedComponentWithType(
      form,
      TestInput,
    );
    expect(inputComponent.isValid()).toEqual(false);
  });
});