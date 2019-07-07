<script>
import { ImportMethod } from '../util/constant'

export default {
	namespaced: true,
	state: {
		importMethod: ImportMethod.APPEND
	},
	mutations: {
		setImportMethod(state, value) {
			state.importMethod = value
		}
	}
}
</script>
