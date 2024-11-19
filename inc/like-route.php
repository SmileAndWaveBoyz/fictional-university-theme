<?php

add_action('rest_api_init', 'universityLikeRoutes');

function universityLikeRoutes() {
    register_rest_route('university/v1', 'manageLike', array(
        'methods' => 'POST',
        'callback' => 'createLike'
      ));

    register_rest_route('university/v1', 'manageLike', array(
        'methods' => 'DELETE',
        'callback' => 'deleteLike'
      ));
}

function createLike($data) {
    if (is_user_logged_in()) {
        $professor = sanitize_text_field($data['professorID']);

        $existQuery = new WP_Query([
            'author' => get_current_user_id(),
            'post_type' => 'like',
            'meta_query' => [
              [
                'key' => 'liked_professor_id',
                'compare' => '=',
                'value' => $professor,
              ]
            ],
          ]);

        if ($existQuery->found_posts == 0 && get_post_type($professor) == 'professor') {
            return wp_insert_post([
                'post_type' => 'like',
                'post_status' => 'publish',
                'post_title' => 'Our PHP Create Post Test',
                'meta_input' => [
                    'liked_professor_id' => $professor,
                ],
            ]);

        }else{
            die('Invalid professor id');
        }


    }else{
        die('Only logged in users can create a like.');
    }
}

function deleteLike() {
    return 'Thanks for trying to delete a like';
}