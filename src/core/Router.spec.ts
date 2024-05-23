import { expect } from "chai";
import Router from "./Router.ts";
import Block from "./Block.ts";
// import sinon from "sinon";


declare global {
    interface Window {
      router: Router;
    }
  }

describe('Router', () => {


    it('should follow the singleton pattern', () => {
        const firstRouter = new Router('#app1')
        const secondRouter = new Router('#app2')
        expect(firstRouter).to.be.equal(secondRouter)
    });

    describe('Router use() method', () => {
        it('should push new route into routes', () =>{
            const router = new Router()
            router.use('/test', Block)
            const route = router.getRoute('/test')
            expect(route).to.exist;
        });
        it('should have proper routes length', () =>{
            const router = new Router()
            expect(router.routes.length).to.be.equal(1) 
    })

    // describe('Router start() and protected routes', () => {
    //     it('should not go to /messenger if not authentificated', () =>{
    //         class MockRouter extends Router{
    //             protected isAuthenticated(): boolean {
    //                 return false
    //             }
    //         }
    //         const mockRouter = new MockRouter()
    //         class Block1 extends Block{}
    //         class Block2 extends Block{}
    //         mockRouter
    //         .use('/login', Block1)
    //         .use('/messenger', Block2)
    //         .start()
    //         mockRouter.go('/messenger')
    //         expect(window.location.pathname).to.be.equal('/login')
    //     })
    // })

    // it('goes back in history', () => {
    //     const router = new Router()
    //     class Block1 extends Block{}
    //     class Block2 extends Block{}
    //     const backSpy = sinon.spy(window.history, 'back')
    //     router.use('/test1', Block1).use('/test2', Block2).start()
    //     router.go('/test1')
    //     router.go('/test2')
    //     router.back()
    //     expect(backSpy.calledOnce).to.be.true
    // })

    })
})


// singleton √
//use √
//start/auth
//go
//get route
//back
//forward
