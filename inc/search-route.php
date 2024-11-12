<?php

add_action('rest_api_init', 'universityRegisterSearch');

function universityRegisterSearch() {
    register_rest_route('university/v1', 'search', [
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'universitySearchResults'
    ]);
}

function universitySearchResults($data) {
    $professors = new WP_Query([
        'post_type' => 'professor',
        's' => sanitize_text_field($data['term'])
    ]);

    $professorResults = [];

    while ($professors->have_posts()) {
        $professors->the_post();
        array_push($professorResults, [
            'title' => get_the_title(),
            'url' => get_the_permalink(),
        ]);
    }

    return $professorResults;
}