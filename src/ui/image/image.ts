import Block from "../../core/Block";

export default class Image extends Block{
    constructor(props){
        super(props)
    }

    render(){
        return(`
            <div class="imageContainer{{contSize}}">
                <img 
                class="image"
                src="{{imgSrc}}" 
                alt="{{imgAlt}}" 
                width="{{imgSize}}" 
                height="{{imgSize}}"
                >
            </div>
        `)
    }
}
