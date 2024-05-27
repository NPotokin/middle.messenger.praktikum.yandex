import { expect } from 'chai';
import Router from './Router.ts';
import Block from './Block.ts';
import sinon from 'sinon';


declare global {
    interface Window {
      router: Router
    }
  }


describe('Router', () => {
  let router: Router | null;

  beforeEach(() => {
    router = new Router('#app');
  });

  afterEach(() => {
    router = null;
    sinon.restore();
  });

  it('should follow the singleton pattern', () => {
    const firstRouter = new Router('#app1');
    const secondRouter = new Router('#app2');
    expect(firstRouter).to.be.equal(secondRouter);
  });

  it('should push new route into routes', () =>{
    router?.use('/test', Block);
    const route = router?.getRoute('/test');
    expect(route).to.exist;
  });

  it('should have proper routes length', () =>{
    expect(router?.routes.length).to.be.equal(1);
  });

  it('should go back in history', () => {
    const backSpy = sinon.spy(router!.history, 'back');
    router?.back();
    expect(backSpy.calledOnce).to.be.true;
  });

  it('should go forward in history', () => {
    const forwardSpy = sinon.spy(router!.history, 'forward');
    router?.forward();
    expect(forwardSpy.calledOnce).to.be.true;
  });

});


