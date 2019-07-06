<template>
	<div class="canvas-container">
		<canvas ref="primaryCanvas" class='primary'></canvas>
		<canvas ref="secondaryCanvas" class='secondary'></canvas>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { stripMarkup } from '../util/util'
import { Event, Color, PathType, Type, AttackType } from '../util/constant'

export default {
	data: function() {
		return {
			imageCache: {},
			imagesCached: 0,
			customArtwork: null,
			previewContexts: [],
			activePreviewContext: 0,
			cacheWaitingTimer: null,
			canvasRenderDebounceTimer: null,

			unsubscribeFromCardStore: () => {}
		}
	},

	watch: {
		imagesCached: function(newValue) {
			if (newValue === this.imageUrls.length && this.customArtworkBase64 && !this.customArtwork) {
				this.preloadCustomArtwork()
			}
		},

		customArtworkBase64: function() { this.preloadCustomArtwork() },
		customArtOffsetX: function() { this.preloadCustomArtwork() },
		customArtOffsetY: function() { this.preloadCustomArtwork() },

		customArtwork: function() {
			this.renderCanvasAfterDelay()
		}
	},

	created: function() {
		for (let i = 0; i < this.imageUrls.length; i++) {
			let url = this.imageUrls[i]
			let finalUrl = 'resources/' + url + '.png'
			let image = new Image()
			image.onload = () => {
				this.imagesCached += 1
				this.imageCache[url] = image
			}
			image.onerror = () => {
				this.imagesCached += 1
				console.error('Unable to load image: ' + url + '.png')
			}
			image.src = finalUrl
		}
	},

	mounted: function() {
		let canvas = this.$refs.primaryCanvas
		let backCanvas = this.$refs.secondaryCanvas

		let width = this.canvasWidth
		let height = this.canvasHeight

		let dpr = window.devicePixelRatio || 1
		canvas.width = width * dpr
		canvas.height = height * dpr
		backCanvas.width = width * dpr
		backCanvas.height = height * dpr
		canvas.style.width = width
		canvas.style.height = height
		backCanvas.style.width = width
		backCanvas.style.height = height

		let ctx = canvas.getContext('2d')
		let backCtx = backCanvas.getContext('2d')
		ctx.scale(dpr, dpr)
		backCtx.scale(dpr, dpr)
		this.previewContexts.push(ctx)
		this.previewContexts.push(backCtx)

		canvas.style.display = 'none'
		backCanvas.style.display = 'none'

		this.$root.$on(Event.SAVE_CARD_AS_IMAGE, () => {
			this.renderCanvas()
			this.saveCanvasToFile()
		})

		this.unsubscribeFromCardStore = this.$store.subscribe((mutation, state) => {
			if (mutation.type.startsWith('cardState')) {
				this.renderCanvasAfterDelay()
			}
		})

		this.$root.$on(Event.CARD_STATE_UPDATED, () => {
			this.renderCanvasAfterDelay()
		})

		this.renderCanvasAfterDelay()
		window.addEventListener('resize', () => {
			this.renderCanvasAfterDelay()
		})

		document.fonts.addEventListener('loadingdone', () => {
			this.renderCanvasAfterDelay()
		})
	},

	beforeDestroy: function() {
		this.unsubscribeFromCardStore()
		this.$root.$off(Event.SAVE_CARD_AS_IMAGE)
		this.$root.$off(Event.CARD_STATE_UPDATED)
	},

	computed: {
		...mapState({
			customArtOffsetX: state => state.cardState.customImageOffsetX,
			customArtOffsetY: state => state.cardState.customImageOffsetY
		}),

		previewContext() {
			return this.previewContexts[this.activePreviewContext]
		},
		displayedContext() {
			let context = 0
			if (this.activePreviewContext === 0) {
				context = 1
			}
			return this.previewContexts[context]
		},
		customArtworkBase64() {
			return this.$store.state.cardState.customImageData
		},
		canvasSize() {
			return '408x584'
		},
		canvasWidth() {
			return this.canvasSize.split('x')[0]
		},
		canvasHeight() {
			return this.canvasSize.split('x')[1]
		},
		imageUrls() {
			let urls = [
				'empty',
				'bg-clean',
				'bg-textured',
				'bg-attribute',
				'bg-name',
				'bg-name-low',
				'bg-name-modern',
				'bg-initiative',
				'bg-stats',
				'bg-description',
				'bg-tribe',
				'bg-tribe-inverted',
				'bg-tribe-modern',
				'bg-path-begin',
				'bg-path-normal',
				'bg-path-fork',
				'bg-path-stop',
				'bg-path-end',
				'bg-element-generic',
				'bg-element-damage',
				'bg-element-healing',
				'bg-element-alteration',
				'bg-element-summoning',
				'bg-element-control',
				'bg-element-sacrifice',
				'attr-freeBuild',
				'attr-freeDraw',
				'attr-freeMove',
				'attr-freeBuildAndDraw',
				'attr-freeDrawAndMove',
				'attr-freeBuildAndMove',
				'attr-freeBuildDrawAndMove',
				'attr-permanent',
				'stat-attack-claw',
				'stat-attack-heal',
				'stat-defense-shield'
			]

			for (let i = 1; i <= 12; i++) {
				urls.push('manacost-' + i)
			}
			for (let i = 5; i <= 50; i += 5) {
				urls.push('goldcost-' + i)
			}

			return urls
		}
	},
	methods: {
		swapContext: function() {
			this.previewContexts[this.activePreviewContext].canvas.style.display = 'block'
			if (this.activePreviewContext === 0) {
				this.activePreviewContext = 1
			} else {
				this.activePreviewContext = 0
			}
			this.previewContexts[this.activePreviewContext].canvas.style.display = 'none'
		},

		renderCanvasAfterDelay: function() {
			if (this.canvasRenderDebounceTimer === null) {
				this.canvasRenderDebounceTimer = setTimeout(this.renderCanvas, 0)
			}
		},

		clearCanvasRenderThrottleTimer: function() {
			this.canvasRenderDebounceTimer = null
		},

		renderCanvas: function() {
			if (this.imagesCached < this.imageUrls.length) {
				this.cacheWaitingTimer = setTimeout(this.renderCanvas, 50)
				console.info('[Card render] Waiting for image cache: ' + this.imagesCached + '/' + this.imageUrls.length)
				return
			}
			let ctx = this.previewContext
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

			let imageCache = this.imageCache

			let backgroundImg = 'bg-clean'
			let sourceWidth = imageCache[backgroundImg].width
			let sourceHeight = imageCache[backgroundImg].height
			let realWidth = this.$el.offsetWidth
			let targetHeight = sourceWidth / (sourceWidth / sourceHeight)
			let parent = $(this.$el).parent()
			$(this.$el).attr('width', sourceWidth).attr('height', targetHeight)
			$(this.$el).css('height', targetHeight)
			$(this.$el).css('max-width', sourceWidth)
			$(this.$el).css('margin-top', parent.height() / 2 - targetHeight / 2)
			$(this.$el).parent().css('min-width', sourceWidth)

			if (this.customArtwork) {
				this.renderCustomArtwork(ctx)
			} else {
				this.renderImage(ctx, backgroundImg)
			}

			let state = this.$store.state.cardState

			let elementFileName = 'bg-element-' + state.cardElement
			this.renderImage(ctx, elementFileName)

			if (state.cardType === Type.ACTION) {
				this.renderImage(ctx, 'bg-path-begin')
			} else if (state.cardType === Type.PATH && state.cardPathType === PathType.NORMAL) {
				this.renderImage(ctx, 'bg-path-normal')
			} else if (state.cardType === Type.PATH && state.cardPathType === PathType.FORK) {
				this.renderImage(ctx, 'bg-path-fork')
			} else if (state.cardType === Type.STATE) {
				this.renderImage(ctx, 'bg-path-stop')
			} else if (state.cardType === Type.RELEASE) {
				this.renderImage(ctx, 'bg-path-end')
			}

			if (state.isFreeBuild || state.isFreeDraw || state.isFreeMove) {
				this.renderImage(ctx, 'bg-attribute')
				if (state.isFreeBuild && state.isFreeDraw && state.isFreeMove) {
					this.renderImage(ctx, 'attr-freeBuildDrawAndMove')
				} else if (state.isFreeBuild && state.isFreeDraw) {
					this.renderImage(ctx, 'attr-freeBuildAndDraw')
				} else if (state.isFreeBuild && state.isFreeMove) {
					this.renderImage(ctx, 'attr-freeBuildAndMove')
				} else if (state.isFreeDraw && state.isFreeMove) {
					this.renderImage(ctx, 'attr-freeDrawAndMove')
				} else if (state.isFreeBuild) {
					this.renderImage(ctx, 'attr-freeBuild')
				} else if (state.isFreeDraw) {
					this.renderImage(ctx, 'attr-freeDraw')
				} else if (state.isFreeMove) {
					this.renderImage(ctx, 'attr-freeMove')
				}
			}

			if (state.isPermanent) {
				this.renderImage(ctx, 'attr-permanent')
			}

			if (state.cardManaCost >= 1 && state.cardManaCost <= 12) {
				this.renderImage(ctx, 'manacost-' + state.cardManaCost)
			}
			if (state.cardGoldCost > 0) {
				this.renderImage(ctx, 'goldcost-' + state.cardGoldCost)
			}

			if (state.cardDescription !== '') {
				this.renderImage(ctx, 'bg-description')
				this.renderCardText(ctx, {
					text: state.cardDescription,
					font: this.getFont('18px', state.cardDescription),
					color: Color.DEFAULT_CARD_TEXT,
					targetX: realWidth / 2,
					targetY: 420,
					lineHeight: 20,
					maxWidth: realWidth - 50,
					maxHeight: 110
				})
			}

			if (state.cardName !== '') {
				this.renderImage(ctx, 'bg-name-modern')
				if (state.cardTitle === '') {
					this.renderCardText(ctx, {
						text: state.cardName,
						font: this.getFont('22px', state.cardName),
						color: 'black',
						targetX: 390,
						targetY: 52,
						lineHeight: 24,
						maxWidth: 220,
						maxHeight: 48,
						verticalAlign: 'center',
						horizontalAlign: 'right'
					})
				} else {
					this.renderCardText(ctx, {
						text: state.cardName,
						font: this.getFont('22px', state.cardName),
						color: 'black',
						targetX: 390,
						targetY: 64,
						lineHeight: 24,
						horizontalAlign: 'right'
					})
				}
			}

			if (state.cardTitle !== '') {
				this.renderCardText(ctx, {
					text: state.cardTitle,
					font: this.getFont('16px', state.cardTitle),
					color: 'black',
					targetX: 390,
					targetY: 88,
					lineHeight: 24,
					horizontalAlign: 'right'
				})
			}

			if (state.cardTribe !== '') {
				this.renderImage(ctx, 'bg-tribe-modern')
				this.renderCardText(ctx, {
					text: state.cardTribe,
					font: this.getFont('18px', state.cardTribe),
					color: 'black',
					targetX: 390,
					targetY: 129,
					lineHeight: 24,
					horizontalAlign: 'right'
				})
			}

			if (state.attack >= 0 || state.health >= 0) {
				this.renderImage(ctx, 'bg-stats')
			}

			if (state.attack >= 0) {
				if (state.attackType === AttackType.NORMAL) {
					this.renderImage(ctx, 'stat-attack-claw')
				} else if (state.attackType === AttackType.HEALING) {
					this.renderImage(ctx, 'stat-attack-heal')
				}

				if (state.attack < 10) {
					this.renderCardText(ctx, {
						text: state.attack.toString(),
						font: '46px BrushScript',
						color: 'black',
						targetX: 298,
						targetY: 568,
						lineHeight: 24
					})
				} else {
					this.renderCardText(ctx, {
						text: state.attack.toString(),
						font: '42px BrushScript',
						color: 'black',
						targetX: 300,
						targetY: 568,
						lineHeight: 24
					})
				}
			}
			if (state.health >= 0) {
				this.renderImage(ctx, 'stat-defense-shield')
				if (state.health < 10) {
					this.renderCardText(ctx, {
						text: state.health.toString(),
						font: '46px BrushScript',
						color: 'black',
						targetX: 380,
						targetY: 568,
						lineHeight: 24
					})
				} else {
					this.renderCardText(ctx, {
						text: state.health.toString(),
						font: '42px BrushScript',
						color: 'black',
						targetX: 382,
						targetY: 568,
						lineHeight: 24
					})
				}
			}
			if (state.initiative >= 1) {
				this.renderImage(ctx, 'bg-initiative')
				this.renderCardText(ctx, {
					text: state.initiative.toString(),
					font: '70px BrushScript',
					color: 'black',
					targetX: 58,
					targetY: 65,
					lineHeight: 24
				})
			}

			this.clearCanvasRenderThrottleTimer()
			this.swapContext()
		},

		getFont: function(size, text) {
			let font = 'K2D'
			let cyrillic = (/[а-яА-Я]/g).exec(text)
			if (cyrillic) {
				font = 'Roboto'
			}
			return size + ' ' + font
		},

		renderText: function(ctx, font, color, text, targetX, targetY, lineHeight, maxWidth, maxHeight) {
			if (text === null || text.length === 0) {
				return
			}
			if (maxWidth === undefined) {
				maxWidth = targetX * 2
			}
			if (maxHeight === undefined) {
				maxHeight = 0
			}

			this.renderCardText(ctx, {
				text: text,
				font: font,
				color: color,
				targetX: targetX,
				targetY: targetY,
				lineHeight: lineHeight,
				maxWidth: maxWidth,
				maxHeight: maxHeight,
				horizontalAlign: 'center'
			})
		},

		renderCardText: function(ctx, options) {
			let text = options.text
			if (!text || text.length === 0) { return }

			let targetX = options.targetX
			let targetY = options.targetY
			let font = options.font || this.getFont('16px', text)
			let color = options.color || 'black'
			let lineHeight = options.lineHeight || 16
			let maxWidth = options.maxWidth || targetX * 2
			let maxHeight = options.maxHeight || 0
			let horizontalAlign = options.horizontalAlign || 'center'
			let verticalAlign = options.verticalAlign || 'center'

			ctx.font = font
			ctx.fillStyle = color

			const maximumLineY = targetY + maxHeight

			let paragraphs = text.split('\n')
			let currentLineY = targetY
			let textLines = []

			while (paragraphs.length > 0) {
				let words = paragraphs[0].split(' ')
				let currentLineText = null; let currentTextCandidate = null

				while (words.length > 0) {
					currentTextCandidate = words[0]
					if (currentLineText !== null) {
						currentTextCandidate = currentLineText + ' ' + currentTextCandidate
					}
					let width = ctx.measureText(stripMarkup(currentTextCandidate)).width
					if (width < maxWidth) {
						currentLineText = currentTextCandidate
						words.splice(0, 1)
					} else if (currentLineText != null) {
						if (currentLineY + lineHeight >= maximumLineY) {
							currentLineText += '...'
							break
						}
						textLines.push({
							text: currentLineText,
							targetX: targetX,
							targetY: currentLineY
						})
						currentLineY += lineHeight
						currentLineText = null
					} else {
						currentLineText = currentTextCandidate
						break
					}
				}

				paragraphs.splice(0, 1)
				textLines.push({
					text: currentLineText,
					targetX: targetX,
					targetY: currentLineY
				})
				if (paragraphs.length > 0) {
					currentLineY += lineHeight * 1.2
				}
			}

			let offset = 0
			if (verticalAlign === 'center') {
				offset = (maximumLineY - currentLineY) / 2
			} else if (verticalAlign === 'bottom') {
				offset = -currentLineY
			}

			for (let lineIndex in textLines) {
				let line = textLines[lineIndex]
				this.renderCardTextLine(ctx, {
					text: line.text,
					defaultColor: color,
					targetX: line.targetX,
					targetY: line.targetY + offset,
					align: horizontalAlign
				})
			}
		},

		renderCardTextLine: function(ctx, { text, defaultColor, targetX, targetY, align }) {
			if (text === null) {
				throw Error('Unable to render null text')
			}

			let cleanText = stripMarkup(text)
			let width = ctx.measureText(cleanText).width
			let renderTargetX = targetX
			if (align === 'center') {
				renderTargetX = targetX - width / 2
			} else if (align === 'right') {
				renderTargetX = targetX - width
			}

			const colorTagPairPattern = /<color=['"]?([a-zA-Z0-9#]+)['"]?>.+<\/color>$/g
			const openingColorTagPattern = /<color=['"]?([a-zA-Z0-9#]+)['"]?>.+$/g
			const invertedColorTagPairPattern = /<\/color>.+<color=['"]?([a-zA-Z0-9#]+)['"]?>$/g
			const closingColorTagPattern = /.+<\/color>$/g
			const firstClosingColorTagPattern = /<\/color>.+$/g
			const lastOpeningColorTagPattern = /.+<color=['"]?([a-zA-Z0-9#]+)['"]?>$/g
			const nakedOpeningColorTagPattern = /<color=['"]?([a-zA-Z0-9#]+)['"]?>$/g
			const nakedClosingColorTagPattern = /<\/color>$/g
			let results
			let currentLineX = renderTargetX

			let words = text.split(' ')

			while (words.length > 0) {
				let word = words[0]
				let cleanWord = stripMarkup(word)
				if (words.length > 1) {
					cleanWord += ' '
				}

				results = colorTagPairPattern.exec(word)
				if (results !== null) {
					ctx.fillStyle = results[1]
					ctx.fillText(cleanWord, currentLineX, targetY)
					ctx.fillStyle = defaultColor
				}

				if (results === null) {
					results = invertedColorTagPairPattern.exec(word)
					if (results !== null) {
						ctx.fillStyle = defaultColor
						ctx.fillText(cleanWord, currentLineX, targetY)
						ctx.fillStyle = results[1]
					}
				}

				if (results === null) {
					results = openingColorTagPattern.exec(word)
					if (results !== null) {
						ctx.fillStyle = results[1]
						ctx.fillText(cleanWord, currentLineX, targetY)
					}
				}

				if (results === null) {
					results = closingColorTagPattern.exec(word)
					if (results !== null) {
						ctx.fillText(cleanWord, currentLineX, targetY)
						ctx.fillStyle = defaultColor
					}
				}

				if (results === null) {
					results = firstClosingColorTagPattern.exec(word)
					if (results !== null) {
						ctx.fillStyle = defaultColor
						ctx.fillText(cleanWord, currentLineX, targetY)
					}
				}

				if (results === null) {
					results = lastOpeningColorTagPattern.exec(word)
					if (results !== null) {
						ctx.fillText(cleanWord, currentLineX, targetY)
						ctx.fillStyle = results[1]
					}
				}

				if (results === null) {
					results = nakedOpeningColorTagPattern.exec(word)
					if (results !== null) {
						ctx.fillStyle = results[1]
					}
				}

				if (results === null) {
					results = nakedClosingColorTagPattern.exec(word)
					if (results !== null) {
						ctx.fillStyle = defaultColor
					}
				}

				if (results === null) {
					ctx.fillText(cleanWord, currentLineX, targetY)
				}

				words.splice(0, 1)
				currentLineX += ctx.measureText(cleanWord).width

				colorTagPairPattern.lastIndex = 0
				openingColorTagPattern.lastIndex = 0
				invertedColorTagPairPattern.lastIndex = 0
				closingColorTagPattern.lastIndex = 0
				firstClosingColorTagPattern.lastIndex = 0
				lastOpeningColorTagPattern.lastIndex = 0
				nakedOpeningColorTagPattern.lastIndex = 0
				nakedClosingColorTagPattern.lastIndex = 0
			}
		},

		preloadCustomArtwork: function() {
			if (!this.customArtworkBase64) {
				this.customArtwork = null
				return
			}

			let image = new Image()
			image.onload = () => {
				this.applyCardMask(image, (croppedImage) => { this.customArtwork = croppedImage })
			}
			image.src = this.customArtworkBase64
		},

		applyCardMask: function(image, callback) {
			let canvas = document.createElement('canvas')
			canvas.width = this.canvasWidth
			canvas.height = this.canvasHeight
			let ctx = canvas.getContext('2d')
			ctx.drawImage(this.imageCache['bg-clean'], 0, 0, this.canvasWidth, this.canvasHeight)
			ctx.globalCompositeOperation = 'source-atop'

			let desiredAspectRatio = this.canvasWidth / this.canvasHeight
			let croppedImageWidth = this.canvasWidth
			let croppedImageHeight = image.height * (this.canvasWidth / image.width) // image.width / desiredAspectRatio;
			let verticalOffset = (croppedImageHeight - this.canvasHeight) / 2
			let horizontalOffset = 0
			if (image.width > image.height * desiredAspectRatio) {
				croppedImageWidth = image.width * (this.canvasHeight / image.height)
				croppedImageHeight = this.canvasHeight
				horizontalOffset = (croppedImageWidth - this.canvasWidth) / 2
				verticalOffset = 0
			}

			horizontalOffset += this.customArtOffsetX
			verticalOffset += this.customArtOffsetY

			ctx.drawImage(image, -horizontalOffset, -verticalOffset, croppedImageWidth, croppedImageHeight)

			let updatedImage = new Image()
			updatedImage.onload = () => {
				callback(updatedImage)
			}
			updatedImage.src = canvas.toDataURL('image/png')
		},

		renderImage: function(ctx, imageId) {
			let image = this.imageCache[imageId]
			if (image === undefined) {
				console.error('Unable to load image: ' + imageId + '.png')
				return
			}

			ctx.drawImage(image, 0, 0, this.canvasWidth, this.canvasHeight)
		},

		renderCustomArtwork: function(ctx) {
			ctx.drawImage(this.customArtwork, 0, 0, this.canvasWidth, this.canvasHeight)
		},

		getCardFileName: function() {
			let enteredName = this.$store.state.cardState.cardName
			if (enteredName.length === 0) {
				return 'sw-unnamed.png'
			} else {
				let illegalNameCharacters = /[….,<>:"/\\|?*\x00-\x31\s]/g
				let formattedName = enteredName.replace(illegalNameCharacters, '')
				formattedName = formattedName.trim()
				formattedName = formattedName.substring(0, 1).toLowerCase() + formattedName.substring(1)
				return 'sw-' + formattedName + '.png'
			}
		},

		saveCanvasToFile: function() {
			let image = this.displayedContext.canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')

			let anchorTag = document.createElement('a')
			document.body.appendChild(anchorTag)
			anchorTag.setAttribute('href', image)
			anchorTag.setAttribute('download', this.getCardFileName())
			anchorTag.click()
			setTimeout(function() {
				document.body.removeChild(anchorTag)
			}, 0)
		}
	}
}
</script>

<style lang='scss' scoped>
	@import "@/styles/variables.scss";

	.canvas-container {
		height: 100%;
		margin-left: auto;
		margin-right: auto;
		width: 408px;
		canvas {
			display: block;
			margin-left: auto;
			margin-right: auto;
		}
	}
</style>
