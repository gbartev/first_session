import { useState } from 'react'
import './App.css'
import backArrow from './assets/back-arrow.svg'
import photoGas from './assets/image_10.webp'

const A = {
  backArrow,
  cardBg:          'https://www.figma.com/api/mcp/asset/e08f5839-6200-4dee-bcd3-39d0562bf07a',
  cardMir:         'https://www.figma.com/api/mcp/asset/f0f0b824-b860-4fd8-bd09-5f64e1f88cde',
  cardWifi:        'https://www.figma.com/api/mcp/asset/0d79fe7d-86d7-45cd-a3fd-a9c55c9f14b9',
  cardBiz:         'https://www.figma.com/api/mcp/asset/a6847783-e92d-4d93-aa50-daf94d390b99',
  arrowCircle:     'https://www.figma.com/api/mcp/asset/671c627c-3aed-445b-9a63-07fbc25c2ea1',
  arrowLine:       'https://www.figma.com/api/mcp/asset/7daadf55-a43b-4c57-acc7-990b4d6a9914',
  swosh1:          'https://www.figma.com/api/mcp/asset/de4b01bb-12cc-4659-b81e-aff469a53863',
  swosh2:          'https://www.figma.com/api/mcp/asset/8577907a-0520-4954-a699-77e3869221b3',
  sneaker:         'https://www.figma.com/api/mcp/asset/1575ca20-ef1b-4835-b031-908690a9998a',
  photo:           'https://www.figma.com/api/mcp/asset/493e89fe-ebd8-468a-a43a-ef274d5df8ba',
  avaAir:          'https://www.figma.com/api/mcp/asset/60bbf5f2-e4b9-4da1-8585-306d34fa3db7',
  avaShop:         'https://www.figma.com/api/mcp/asset/119c0991-9eb5-4bee-830f-5066e8a8ec29',
  avaRepair:       'https://www.figma.com/api/mcp/asset/9003860d-39f3-4ed1-94f0-31f8bff34d55',
  magneticStripe:  'https://www.figma.com/api/mcp/asset/7c6c1d97-92d2-4a19-8ef6-6e0edfe36147',
  checkbox:        'https://www.figma.com/api/mcp/asset/26b55edd-6630-4830-b1c2-7265c8fae1a6',
}

// Портретная карта: top-left = (124, 338) в leftPanel, размер 296×464
// Формула перевода portrait → landscape (cardFront 464×296):
//   lx = 464 - (portTop + portHeight)
//   ly = portLeft - 124
//   lw = portHeight, lh = portWidth
const CARD_LEFT = 124
const CARD_TOP  = 338

const LETTERS = [
  { src: '038d7d31-7427-499f-ac55-10df300b4ad9', l: 155.46,  t: 545.282, w: 21.034, h: 21.508 },
  { src: 'c2b3dd75-18b0-473d-8c13-d2c2ed20ecc8', l: 155.46,  t: 572.078, w: 21.034, h: 20.032 },
  { src: 'cc08dbb5-63b0-49f6-94e4-e1e8ad44b2bd', l: 154.97,  t: 595.636, w: 22.041, h: 22.984 },
  { src: '81b10c96-38dc-43b0-9825-f729b6b48aac', l: 147.06,  t: 621.073, w: 30.077, h: 24.087 },
  { src: '569a8b18-4fc2-4242-b2f5-e5c92ef466d7', l: 154.97,  t: 655.736, w: 22.041, h: 22.984 },
  { src: 'dcb2c8e8-e0ed-43f9-b5ed-6797142751b3', l: 155.46,  t: 680.312, w: 21.034, h: 21.508 },
  { src: 'b0cd1495-f193-49d2-8ef1-a2bda8af4a0c', l: 155.46,  t: 707.087, w: 21.034, h: 20.163 },
  { src: '66a9f653-cc64-4edb-8418-79f5a17597ed', l: 154.75,  t: 729.858, w: 22.451, h: 23.732 },
  { src: '49d053a8-972c-4d65-8469-2aed8799f0da', l: 155.46,  t: 755.131, w: 21.034, h: 20.069 },
]

function toLandscape(l, t, w, h) {
  return {
    left:   464 - (t - CARD_TOP) - h,
    top:    l - CARD_LEFT,
    width:  h,
    height: w,
  }
}

const LOGOS = [
  {
    paddingTop: 32.599,
    items: [
      { bg: '#ff5226', src: 'ccee9a7c-8116-4922-a500-56eb4ab6908e', inset: '20.83% 13.54% 27.08% 13.54%' },
      { bg: '#1161fb', src: '52594130-178a-48cf-a4d9-cc7aea57c841', inset: '41.67% 12.5% 41.93% 12.5%' },
      { bg: '#cb11ab', src: '052dfe78-5cd1-442d-956f-0daa342d26f1', inset: '28.13% 12.5% 31.78% 12.5%' },
      { bg: '#ff5226', src: 'ccee9a7c-8116-4922-a500-56eb4ab6908e', inset: '20.83% 13.54% 27.08% 13.54%' },
    ],
  },
  {
    paddingTop: 0,
    items: [
      { bg: '#eb2316', src: 'f786aaff-02a3-4ddf-8137-890d0bde69ad', inset: '18.75% 18.75% 18.75% 18.75%' },
      { bg: '#005921', src: '7a79f63b-543f-40fd-8546-57b007664754', inset: '18.75% 18.75% 18.75% 18.75%' },
      { bg: '#e6000e', src: '1abb1375-98cc-43c8-b9f4-069dea114bfb', inset: '22.92% 22.92% 22.92% 22.92%' },
      { bg: '#073e94', src: '5e76c9cd-db0b-4518-b521-91eccf26f0ed', inset: '18.82% 25% 18.82% 22.92%' },
    ],
  },
  {
    paddingTop: 16.3,
    items: [
      { bg: '#6e00be', src: '480dbd0e-abd8-4681-b4a4-95275f4e9df0', inset: '34.38% 18.75% 33.32% 18.75%' },
      { bg: '#f5c52e', src: 'b9828ad5-8a1f-4719-be69-edfc31854b4e', inset: '14.58% 23.96% 14.58% 23.96%' },
      { bg: '#28e1b9', src: '022052bc-9e1f-43de-8bde-0b030df0bda1', inset: '32.29% 12.5% 34.65% 12.5%' },
      { bg: '#ed1a3a', src: 'b245228d-70f5-40e6-be1f-a4465dde5cae', inset: '25% 20.83% 25% 25%' },
    ],
  },
]

export default function App() {
  const [phase, setPhase] = useState(0)

  function handleActivate() {
    if (phase > 0) return
    setPhase(2)
    setTimeout(() => setPhase(3), 500)
    setTimeout(() => setPhase(4), 1000)
  }

  function handleBack() {
    if (phase === 0) return
    if (phase >= 3) {
      setPhase(3)
      setTimeout(() => setPhase(2), 300)
      setTimeout(() => setPhase(0), 800)
    } else {
      setPhase(0)
    }
  }

  const textHidden     = phase >= 1
  const panelExpanded  = phase >= 2
  const cardCentered   = phase >= 2
  const cardHorizontal = phase >= 2
  const cardFlipped    = phase >= 3
  const showActivation = phase >= 4

  // Ландшафтные позиции фиксированных оверлеев
  const mirPos  = toLandscape(361.72, 363.864, 31.724,  113.326)
  const wifiPos = toLandscape(240.01, 756.032, 23.787,  18.878)
  const bizPos  = toLandscape(161.58, 373.965, 15.02,   85.385)

  return (
    <div className="page">

      {/* ── ЛЕВАЯ ПАНЕЛЬ ── */}
      <div className={`leftPanel ${panelExpanded ? 'expanded' : ''}`}>

        <button className="backBtn" onClick={handleBack}>
          <img src={A.backArrow} alt="Назад" />
        </button>

        <div className={`leftHeader ${textHidden ? 'hidden' : ''}`}>
          <div className="leftTitle">
            Активируйте карту
            <span className="leftTitleScript">для бизнеса и жизни</span>
          </div>
          <p className="leftSubtitle">
            Дебетовая карта с моментальной<br />
            оплатой и выгодным кэшбэком в популярных категориях
          </p>
        </div>

        {/* Карта — единая сущность, оверлеи внутри */}
        <div className={`cardAnchor ${cardCentered ? 'centered' : ''}`}>
          <div className={`cardOrient ${cardHorizontal ? 'horizontal' : ''}`}>
            <div className={`cardFlip3D ${cardFlipped ? 'flipped' : ''}`}>

              {/* Лицевая сторона: фон карты + все оверлеи вместе */}
              <div className="cardFront">
                <img src={A.cardBg} alt="" />

                {/* МИР */}
                <div className="cardOverlayFlat" style={{ left: `${mirPos.left}px`, top: `${mirPos.top}px`, width: `${mirPos.width}px`, height: `${mirPos.height}px` }}>
                  <img src={A.cardMir} alt="МИР" />
                </div>

                {/* WiFi */}
                <div className="cardOverlayFlat" style={{ left: `${wifiPos.left}px`, top: `${wifiPos.top}px`, width: `${wifiPos.width}px`, height: `${wifiPos.height}px` }}>
                  <img src={A.cardWifi} alt="" />
                </div>

                {/* Business */}
                <div className="cardOverlayFlat" style={{ left: `${bizPos.left}px`, top: `${bizPos.top}px`, width: `${bizPos.width}px`, height: `${bizPos.height}px` }}>
                  <img src={A.cardBiz} alt="" />
                </div>

                {/* Буквы "а банк" */}
                {LETTERS.map((lt, i) => {
                  const pos = toLandscape(lt.l, lt.t, lt.w, lt.h)
                  return (
                    <div
                      key={i}
                      className="cardOverlayFlat"
                      style={{ left: `${pos.left}px`, top: `${pos.top}px`, width: `${pos.width}px`, height: `${pos.height}px` }}
                    >
                      <img src={`https://www.figma.com/api/mcp/asset/${lt.src}`} alt="" />
                    </div>
                  )
                })}
              </div>

              {/* Обратная сторона: форма активации */}
              <div className="cardBack">
                <div className="cardMagneticStripe">
                  <img src={A.magneticStripe} alt="" />
                </div>
                <div className="cardFormRow">
                  <span className="cardFormLabel">0000&nbsp;&nbsp;0000&nbsp;&nbsp;0000</span>
                  <input
                    className="cardInput input4"
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="0000"
                    pattern="[0-9]*"
                  />
                </div>
                <div className="cardFormRow">
                  <span className="cardFormLabel">CARD ID</span>
                  <input
                    className="cardInput input7"
                    type="text"
                    inputMode="numeric"
                    maxLength={7}
                    placeholder="0000000"
                    pattern="[0-9]*"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className={`leftFooter ${textHidden ? 'hidden' : ''}`}>
          <button className="btnPrimary" onClick={handleActivate}>Активировать</button>
          <button className="btnGhost">Напомнить позже</button>
        </div>

        {/* Финальный экран: заголовок + чекбокс + кнопка (фаза 4) */}
        <div className={`activationOverlay ${showActivation ? 'visible' : ''}`}>

          {/* Заголовок */}
          <div className="activationHeader">
            <div className="activationHeaderTitle">
              Активируйте карту
              <span className="activationHeaderScript">для бизнеса и жизни</span>
            </div>
            <p className="activationHeaderSub">
              Для активации карты укажите последние четыре цифры номера карты и её CARD ID
            </p>
          </div>

          {/* Чекбокс */}
          <div className="activationCheckbox">
            <p className="activationCheckboxText">
              Соглашаюсь с{' '}
              <span className="activationCheckboxLink">Порядком 3</span>
              {' '}о предоставлении и использовании банковских карт
            </p>
            <button className="activationCheckboxBtn">
              <img src={A.checkbox} alt="Согласен" />
            </button>
          </div>

          {/* Кнопка */}
          <button className="activationSubmitBtn" onClick={() => console.log('Активировать')}>
            Активировать
          </button>

        </div>

      </div>

      {/* ── ПРАВАЯ ПАНЕЛЬ ── */}
      <div className={`rightPanel ${textHidden ? 'exiting' : ''}`}>

        {/* Карточка кэшбэка */}
        <div className="cashbackCard">
          <div className="decoCircle" style={{ top: '-188px', left: '316px' }} />
          <div className="decoCircle" style={{ top: '-126px', left: '463px' }} />
          <div className="decoCircle" style={{ top: '380px',  left: '610px' }} />

          <div className="cashbackHeader">
            <div className="cashbackTitle">
              До 4%{' '}
              <span className="cashbackTitleScript">кэшбэк</span>
            </div>
            <p className="cashbackSubtitle">
              По умолчанию 1%<br />со всех покупок
            </p>
          </div>

          <div className="logosOuter">
            {LOGOS.map((col, ci) => (
              <div key={ci} className={`logoCol ${ci === 1 ? 'animUp' : 'animDown'}`} style={{ paddingTop: `${col.paddingTop}px` }}>
                {[...col.items, ...col.items].map((logo, li) => (
                  <div key={li} className="logoItem" style={{ background: logo.bg }}>
                    <div className="logoInner" style={{ inset: logo.inset }}>
                      <img src={`https://www.figma.com/api/mcp/asset/${logo.src}`} alt="" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="moreLink">
            <span className="moreLinkText">Подробнее</span>
            <div className="moreLinkIcon">
              <img src={A.arrowCircle} alt="" />
              <img src={A.arrowLine} alt="" />
            </div>
          </div>
        </div>

        {/* Нижний ряд */}
        <div className="bottomRow">

          <div className="bottomCard personalCard">
            <div className="sneakerClip">
              <div className="swosh1">
                <img src={A.swosh1} alt="" />
              </div>
              <div className="swosh2">
                <img src={A.swosh2} alt="" />
              </div>
              <div className="sneakerWrap">
                <img src={A.sneaker} alt="Кроссовок" />
              </div>
            </div>
            <div className="cardTextFooter">
              <p className="cardFooterTitle">Можно тратить<br />на личные нужды</p>
              <p className="cardFooterDesc">Без лишних ограничений.<br />Радуйте себя</p>
            </div>
          </div>

          <div className="bottomCard">
            <img className="settingsPhoto" src={photoGas} alt="" />
            <div className="photoOverlay" />
            <div className="avatarIcon" style={{ top: '62px',  left: '38px',  width: '40px', height: '40px', background: '#82bad4' }}>
              <img src={A.avaAir} alt="Авиа" />
            </div>
            <div className="avatarIcon" style={{ top: '149px', left: '116px', width: '56px', height: '56px', background: '#de9c7e' }}>
              <img src={A.avaShop} alt="Супермаркет" />
            </div>
            <div className="avatarIcon" style={{ top: '138px', left: '267px', width: '40px', height: '40px', background: '#e59594' }}>
              <img src={A.avaRepair} alt="Ремонт" />
            </div>
            <div className="cardTextFooter">
              <p className="cardFooterTitle">Гибкая настройка карты</p>
              <p className="cardFooterDesc">Устанавливайте лимиты и задавайте категории трат</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
