<script>
import { EditorMode, ImportMethod } from '../util/constant'

export default {
	namespaced: true,
	state: {
		importMethod: ImportMethod.APPEND,
		editorMode: EditorMode.PROTOTYPE
	},
	mutations: {
		setImportMethod(state, value) {
			state.importMethod = value
		},

		setEditorMode(state, value) {
			state.editorMode = value
		}
	}
}
</script>
