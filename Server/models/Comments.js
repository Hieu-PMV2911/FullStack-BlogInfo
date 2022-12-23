module.exports = (sequelize, DataTypes) => {
	const Comments = sequelize.define('Comments',{ 
		commentsBody: {
			type:DataTypes.STRING,
			allowNull: false
		},
		userName: {
			type:DataTypes.STRING,
			allowNull: false
		},
		PostId: {
			type:DataTypes.STRING,
			allowNull: false
		},
	})
	return Comments
}