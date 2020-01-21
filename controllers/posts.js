

exports.fetchAll = async (req, res) => {
    try {
        const posts = [
            { id: '1', image: 'gafrika.png', header: 'Güney Afrika gezimden', category: 'Seyehat', status: 'Yayında', approval: 'Kapalı', date: '22.11.2019' },
            { id: '2', image: 'gafrika.png', header: 'Güney Afrika gezimden', category: 'Seyehat', status: 'Taslak', approval: 'Açık', date: '22.11.2019' },
            { id: '3', image: 'gafrika.png', header: 'Güney Afrika gezimden', category: 'Seyehat', status: 'Özel', approval: 'Kapalı', date: '22.11.2019' }
        ];
        res.status(200).json({
            message: 'Posts fetch succesfully!',
            posts: posts
        });
    } catch (err) {
        throw err;
    }
};
exports.addPost = async (req, res) => {
    try {
        const post = req.body;
        console.log(post);
        res.status(201).json({
            message: 'Posts added succesfully!'
        });
    } catch (err) {
        throw err;
    }
};