import './styles/style.scss'
import { Application, Graphics, Sprite, Texture } from 'pixi.js'
import { gsap } from 'gsap'
import { getIndex, paginate } from './helpers'

type Asset = { name: string, url: string }

const assetsMap: Asset[] = [
  { name: '1', url: 'src/assets/images/1.jpg' },
  { name: '3', url: 'src/assets/images/3.jpg' },
  { name: '4', url: 'src/assets/images/4.jpg' },
]

const state = {
  prev: 0,
  page: 0,
  next: 1,
}

// root
const root = document.getElementById('slider') as HTMLDivElement
const width = root.clientWidth
const height = root.clientHeight

// buttons
const prevBtn = document.getElementById('prev') as HTMLButtonElement
const nextBtn = document.getElementById('next') as HTMLButtonElement

// app
const app = new Application({ width, height, antialias: true })
root.appendChild(app.view)

// load assets
const textures = assetsMap.map((asset: Asset) => Texture.from(asset.url))

// create sprites
  const { prev, next } = state
  const prevSprite = new Sprite(textures[prev])
  prevSprite.anchor.set(0.5)
  app.stage.addChild(prevSprite)

  const mask = new Graphics()
  app.stage.addChild(mask)

  const nextSprite = new Sprite(textures[next])
  nextSprite.anchor.set(0.5)
  app.stage.addChild(nextSprite)
  nextSprite.mask = mask

  // handlers
  function rightToLeft () {
    const params = { a: 0 }
    gsap.to(params, 0.8,
      {
        a: 1,
        onUpdate: () => {
          mask.beginFill(0xffffff, 1)
          mask.lineStyle(0)
          mask.moveTo(width, 0)
          mask.lineTo(width - width * (params.a ** 2), 0)
          mask.lineTo(width - width * (params.a **  3), height)
          mask.lineTo(width, height)
        },
        onComplete: () => {
          prevSprite.texture = textures[state.next]
          mask.clear()
          state.page = paginate(state.page, -1)
          state.prev = getIndex(state.page, assetsMap.length)
          state.next = getIndex(paginate(state.page, -1), assetsMap.length)
          nextSprite.texture = textures[state.next]
        },
      },
    )
  }

  function leftToRight () {
    console.log('hello')
    const params = { a: 0 }
    gsap.to(params, 0.8, {
        a: 1, onUpdate: () => {
        mask.beginFill(0xffffff)
          mask.moveTo(0, 0)
          mask.lineTo(width * (params.a ** 2) , 0)
          mask.lineTo(width * (params.a ** 3), height)
          mask.lineTo(0, height)
        }, onComplete: () => {
        prevSprite.texture = textures[state.next]
        mask.clear()
        state.page = paginate(state.page, 1)
        state.prev = getIndex(state.page, assetsMap.length)
        state.next = getIndex(paginate(state.page, 1), assetsMap.length)
        nextSprite.texture = textures[state.next]
        },
      },
    )
  }

  prevBtn.addEventListener('click', rightToLeft)
  nextBtn.addEventListener('click', leftToRight)
