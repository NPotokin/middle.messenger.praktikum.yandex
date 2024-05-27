import { expect } from 'chai';
import Block from './Block.ts';
import sinon from 'sinon';

describe('Block', () => {
  let PageClass: typeof Block;

  before(() => {
    class TestBlock extends Block{
      constructor(props:{}){
        super({
          ...props,
        });
      }

      render(){
        return(`
                    <div>
                        <span id="test-text">{{text}}</span>
                        <button>{{text-button}}</button>
                    </div>
                `);
      }
    }
    PageClass = TestBlock;
  });

  it('should initialize the class with props from constructor()', () => {
    const text = 'Hello';
    const pageComponent = new PageClass({text});

    const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

    expect(spanText).to.be.equal(text);
  });

  it('shouild be able to set props', () => {
    const newPropsText = '21';
    const pageComponent = new PageClass({text: '9+10?'});

    pageComponent.setProps({text: newPropsText});
    const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;
    expect(spanText).to.be.equal(newPropsText);
  });

  it('should attach events to the component',() => {
    const eventStub = sinon.stub();
    const pageComponent = new PageClass({
      events:{
        click: eventStub,
      },
    });
    const event = new MouseEvent('click');
    pageComponent.element?.dispatchEvent(event);
    expect(eventStub.calledOnce).to.be.true;
  });

  it('should call componentDidMount lifecycle method', () => {
    const componentDidMountSpy = sinon.spy(PageClass.prototype, 'componentDidMount');
    const pageComponent = new PageClass({text: 'Hello'});

    pageComponent.dispatchComponentDidMount();

    expect(componentDidMountSpy.calledOnce).to.be.true;
    componentDidMountSpy.restore();
  });

  it('should show the component', () => {
    const pageComponent = new PageClass({text: 'Hello'});
    pageComponent.hide();
    pageComponent.show();
    expect(pageComponent.element?.style.display).to.equal('block');
  });

  it('should hide the component', () => {
    const pageComponent = new PageClass({text: 'Hello'});
    pageComponent.show();
    pageComponent.hide();
    expect(pageComponent.element?.style.display).to.equal('none');
  });

  it('should call componentDidUpdate on props change', () => {
    const componentDidUpdateSpy = sinon.spy(PageClass.prototype, 'componentDidUpdate');
    const pageComponent = new PageClass({text: 'Hello'});
    pageComponent.setProps({text: 'Updated Text'});
    expect(componentDidUpdateSpy.calledOnce).to.be.true;
    componentDidUpdateSpy.restore();
  });

  it('should correctly handle adding events', () => {
    const eventStub = sinon.stub();
    const pageComponent = new PageClass({
      events: {
        click: eventStub,
      },
    });

    const event = new MouseEvent('click');
    pageComponent.element?.dispatchEvent(event);

    pageComponent._addEvents();
    pageComponent.element?.dispatchEvent(event);
    expect(eventStub.calledTwice).to.be.true;
  });

  it('should correctly handle removing events', () => {
    const eventStub = sinon.stub();
    const pageComponent = new PageClass({
      events: {
        click: eventStub,
      },
    });

    const event = new MouseEvent('click');
    pageComponent.element?.dispatchEvent(event);

    pageComponent._removeEvents();
    pageComponent.element?.dispatchEvent(event);
    expect(eventStub.calledOnce).to.be.true;

  });


});
