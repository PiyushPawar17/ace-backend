module.exports = {
	extends: ['prettier', 'plugin:@typescript-eslint/recommended'],
	ignorePatterns: ['!**/*'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint/eslint-plugin'],
	env: {
		node: true
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
			rules: {
				'@typescript-eslint/interface-name-prefix': 'off',
				'@typescript-eslint/explicit-function-return-type': 'off',
				'@typescript-eslint/explicit-module-boundary-types': 'off',
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/ban-types': 'off',
				'@typescript-eslint/indent': [
					'warn',
					'tab',
					{
						SwitchCase: 1,
						ignoredNodes: [
							'FunctionExpression > .params[decorators.length > 0]',
							'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
							'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key'
						]
					}
				],
				'@typescript-eslint/member-delimiter-style': [
					'warn',
					{
						multiline: {
							delimiter: 'semi',
							requireLast: true
						},
						singleline: {
							delimiter: 'semi',
							requireLast: false
						}
					}
				],
				'no-unused-vars': 'off',
				'@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_+$' }],
				'@typescript-eslint/no-unused-expressions': [
					'warn',
					{
						allowShortCircuit: true
					}
				],
				indent: 'off',
				'@typescript-eslint/semi': ['warn', 'always'],
				'@typescript-eslint/type-annotation-spacing': 'warn',
				'arrow-parens': ['warn', 'as-needed'],
				'comma-dangle': ['warn', 'never'],
				'eol-last': 'warn',
				eqeqeq: ['warn', 'smart'],
				'no-multiple-empty-lines': 'warn',
				'no-redeclare': 'error',
				'no-var': 'error',
				'one-var': ['warn', 'never'],
				'prefer-const': [
					'warn',
					{
						destructuring: 'all'
					}
				],
				'quote-props': ['warn', 'as-needed'],
				radix: 'error',
				'@typescript-eslint/no-non-null-assertion': 'off',
				'comma-spacing': ['warn', { before: false, after: true }],
				'key-spacing': ['warn', { afterColon: true }],
				'no-console': 'warn'
			}
		}
	]
};
