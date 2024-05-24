import { expect } from 'chai';
import Route from './Route.ts';
import Block from './Block.ts';
import sinon from 'sinon';


describe('Route', () => {
  let route: Route;
  const rootQuery = '#root';
  const pathname = '/test';


  beforeEach(() => {
    route = new Route(pathname,  Block, { rootQuery });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should be an instance of Route', () => {
    expect(route).to.be.an.instanceof(Route);
  });

  it('should match the correct path', () => {
    expect(route.match(pathname)).to.be.true;
  });

  it('should not match the wrong path', () => {
    expect(route.match('/wrong')).to.be.false;
  });

  it('should call render on navigate', () => {
    const renderStub = sinon.stub(route, 'render');
    route.navigate(pathname);
    expect(renderStub.calledOnce).to.be.true;
  });

  it('should call hide method on leave', () => {
    const blockInstance = route['_block'] as Block;
    if(blockInstance){
      const hideStub = sinon.stub(blockInstance, 'hide');
      route.leave();
      expect(hideStub.calledOnce).to.be.true;
    }
  });

  it('should call show method on render', () => {
    const blockInstance = route['_block'] as Block;
    if(blockInstance){
      const showStub = sinon.stub(blockInstance, 'show');
      route.render();
      expect(showStub.calledOnce).to.be.true;
    }
  });

});
