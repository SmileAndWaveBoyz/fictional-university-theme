<?php

  if (!is_user_logged_in()) {
    esc_url(wp_redirect(site_url('/')));
    exit;
  }

  get_header();

  while(have_posts()) {
    the_post();
    pageBanner();
     ?>

    <div class="container container--narrow page-section">
        <ul class="min-list link-list" id="my-notes">
            <?php
                $userNotes = new WP_Query([
                    'post_type' => 'note',
                    'posts_per_page' => -1,
                    'author' => get_current_user_id(),
                ]);

                while ($userNotes->have_posts()) {
                    $userNotes->the_post();
                    ?>
                        <li data-id="<?php the_ID() ?>">
                            <input readonly class="note-title-field" type="text" value="<?php echo esc_attr(get_the_title()); ?>">
                            <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>
                            <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span>
                            <textarea readonly class="note-body-field" name="" id=""><?php echo esc_attr(wp_strip_all_tags(get_the_content())); ?></textarea>
                            <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right" aria-hidden="true"></i> Save</span>
                        </li>
                    <?php
                }
            ?>
        </ul>
    </div>

  <?php }

  get_footer();

?>